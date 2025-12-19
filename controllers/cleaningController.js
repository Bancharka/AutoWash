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
      backUrl: "/",
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

    const taskIds = req.body.taskIds || [];
    const taskIdsString = taskIds.join(",");

    const newLog = await db.Logs.create({
      stationId: req.body.stationId,
      comment: req.body.comment,
      userId: userId,
      viewToken: viewToken,
      tokenUsed: false,
      taskIds: taskIdsString,
    });

    console.log("New log created:", newLog.id);

    const station = await db.Stations.findByPk(req.body.stationId, {
      include: [
        {
          model: db.Companies,
          as: "companies",
        },
      ],
      raw: false,
    });

    const user = await db.Users.findByPk(userId, { raw: true });
    const plainStation = station.toJSON();

    const productIds = req.body.productIds || [];

    if (productIds.length > 0) {
      for (const productId of productIds) {
        const amount = parseFloat(req.body[`productAmount_${productId}`]);
        const unitId = parseInt(req.body[`productUnit_${productId}`]);

        console.log(`Product ${productId}: amount=${amount}, unitId=${unitId}`);

        if (isNaN(amount) || isNaN(unitId)) {
          console.error(`Invalid data for product ${productId}`);
          continue;
        }

        await db.UsedProducts.create({
          logId: newLog.id,
          productId: productId,
          amount: amount,
          unitId: unitId,
        });

        console.log(`Saved product ${productId}`);
      }
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
          .rotate()
          .resize(800, 600, { fit: "inside" })
          .jpeg({ quality: 80 })
          .toFile(resizedPath);

        await db.Images.create({
          logId: newLog.id,
          path: `image-uploads/${resizedFilename}`,
          isBefore: isBefore,
        });
      }
    };

    await uploadImages(req.files.beforeImages, true);
    await uploadImages(req.files.afterImages, false);

    const nodemailer = require("nodemailer");

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
      to: "onetimelink8@gmail.com",
      subject: `Station rengjort: ${plainStation.address}`,
      html: emailHTML,
    });

    console.log("Email sendt!");

    res.redirect("/");
  } catch (error) {
    console.error("Upload fejl:", error);
    res.status(500).send("Fejl ved upload af billeder: " + error.message);
  }
};

exports.viewCleaning = async (req, res) => {
  try {
    const { token } = req.params;

    const log = await db.Logs.findOne({
      where: {
        viewToken: token,
        tokenUsed: false,
      },
      include: [
        {
          model: db.Stations,
          as: "stations",
          include: [
            {
              model: db.Companies,
              as: "companies",
            },
          ],
        },
        {
          model: db.Users,
        },
        {
          model: db.Images,
        },
      ],
    });

    if (!log) {
      return res
        .status(404)
        .send("Dette link er ugyldigt eller er allerede åbnet, og brugt");
    }

    await log.update({ tokenUsed: true });

    const plainLog = log.toJSON();

    const beforeImages = plainLog.Images.filter((img) => img.isBefore);
    const afterImages = plainLog.Images.filter((img) => !img.isBefore);

    const usedProducts = await db.UsedProducts.findAll({
      where: { logId: log.id },
      include: [
        {
          model: db.Products,
          as: "product",
        },
        {
          model: db.Units,
          as: "unit",
        },
      ],
      raw: false,
    });

    const plainProducts = usedProducts.map((up) => up.toJSON());
    let plainTasks = [];
    if (plainLog.taskIds) {
      const taskIdArray = plainLog.taskIds.split(",").map((id) => parseInt(id));

      const tasks = await db.Tasks.findAll({
        where: {
          id: taskIdArray,
        },
        raw: true,
      });

      plainTasks = tasks;
    }

    res.render("viewCleaning", {
      title: "Rengøringsrapport",
      log: plainLog,
      stations: plainLog.stations,
      user: plainLog.User,
      beforeImages: beforeImages,
      afterImages: afterImages,
      products: plainProducts,
      tasks: plainTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Fejl ved indlæsning");
  }
};
