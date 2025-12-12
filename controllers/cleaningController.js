const db = require("../models");
const crypto = require("crypto");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

exports.getNewCleaning = async (req, res) => {
  try {
    const stations = await db.Stations.findAll({
      include: [{ model: db.Companies, as: "companies" }],
      raw: false,
    });

    const products = await db.Products.findAll({ raw: true });
    const units = await db.Units.findAll({ raw: true });
    const tasks = await db.Tasks.findAll({ raw: true });

    const stationOptions = stations.map((station) => ({
      value: station.id,
      text: `${station.address}, ${station.city}`,
    }));

    const productOptions = products.map((product) => ({
      value: product.id,
      text: product.name,
    }));

    const unitOptions = units.map((unit) => ({
      value: unit.id,
      text: unit.name,
    }));

    const taskOptions = tasks.map((task) => ({
      value: task.id,
      text: task.name,
    }));

    res.render("newCleaning", {
      title: "Ny rengøring",
      stationOptions,
      productOptions,
      taskOptions,
      unitOptions,
      units,
      backUrl: "/dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading page");
  }
};

exports.postNewCleaning = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const viewToken = crypto.randomBytes(32).toString("hex");

    const newLog = await db.Logs.create({
      stationId: req.body.stationId,
      comment: req.body.comment,
      userId,
      viewToken,
      tokenUsed: false,
    });

    const station = await db.Stations.findByPk(req.body.stationId, {
      include: [{ model: db.Companies, as: "companies" }],
      raw: false,
    });

    const plainStation = station.toJSON();

    const productIds = req.body.productIds || [];
    const productAmounts = req.body.productAmounts || [];
    const productUnits = req.body.productUnits || [];

    for (let i = 0; i < productIds.length; i++) {
      await db.UsedProducts.create({
        logId: newLog.id,
        productId: productIds[i],
        amount: parseFloat(productAmounts[i]),
        unitId: parseInt(productUnits[i]),
      });
    }

    const uploadImages = async (files, isBefore) => {
      if (!files) return;

      for (const file of files) {
        const resizedFilename = `resized-${file.filename}`;
        const resizedPath = path.join(
          __dirname,
          "..",
          "image-uploads",
          resizedFilename
        );

        await sharp(file.path)
          .resize(800, 600, { fit: "inside" })
          .jpeg({ quality: 80 })
          .toFile(resizedPath);

        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.warn("Could not delete temp file:", err.message);
        }

        await db.Images.create({
          logId: newLog.id,
          path: `image-uploads/${resizedFilename}`,
          isBefore,
        });
      }
    };

    await uploadImages(req.files.beforeImages, true);
    await uploadImages(req.files.afterImages, false);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "op7486684@gmail.com",
        pass: process.env.EMAIL_PASS_SECRET,
      },
    });

    const viewLink = `http://localhost:3000/view-cleaning/${viewToken}`;

    const emailHTML = `
            <h2>Station rengjort</h2> 
            <p><a href="${viewLink}">Tryk her for at se rengøringsrapport</a></p>
        `;

    await transporter.sendMail({
      from: '"AutoWash System" <op7486684@gmail.com>',
      to: "olipet101@gmail.com",
      subject: `Station rengjort: ${plainStation.address}`,
      html: emailHTML,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Upload fejl:", error);
    res.status(500).send("Fejl ved upload af billeder");
  }
};

exports.viewCleaning = async (req, res) => {
  try {
    const { token } = req.params;

    const log = await db.Logs.findOne({
      where: { viewToken: token, tokenUsed: false },
      include: [
        {
          model: db.Stations,
          as: "stations",
          include: [{ model: db.Companies, as: "companies" }],
        },
        { model: db.Users },
        { model: db.Images },
      ],
    });

    if (!log) {
      return res
        .status(404)
        .send("Dette link er ugyldigt eller er allerede åbnet, og brugt");
    }

    await log.update({ tokenUsed: true });

    const plain = log.toJSON();

    const beforeImages = plain.Images.filter((image) => image.isBefore);
    const afterImages = plain.Images.filter((image) => !image.isBefore);

    res.render("viewCleaning", {
      title: "Rengøringsrapport",
      log: plain,
      station: plain.Station,
      user: plain.User,
      beforeImages,
      afterImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Fejl ved indlæsning");
  }
};
