require("dotenv").config();

const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const { type } = require("os");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const upload = require("./multer");
const helpers = require("./helpers/helpers");
const Handlebars = require("handlebars");
const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("./models");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = 3000;

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
    helpers: {
      eq: function (a, b) {
        return a === b;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views/");

// Bestemmer hvor vi henter static filer fra (f.eks CSS)
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/image-uploads",
  express.static(path.join(__dirname, "image-uploads"))
);

// Middleware der giver hver route adgang til currentPath, som bruges til at se hvilken url man er på
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.SECURE == true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use(authRoutes);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  console.log(req.session);
  next();
});

app.get("/", async (req, res) => {
  try {
    res.render("login", {
      title: "Log ind",
      showgraphic: true,
    });
  } catch (error) { }
});

app.get("/create-user", async (req, res) => {
  res.render("createUser", {
    title: "Opret bruger",
    showgraphic: true,
  });
});

app.get("/dashboard", async (req, res) => {
  const id = req.session.user.id;
  const logs = await db.Logs.findAll({
    where: { userId: id },
    include: [
      {
        model: db.Stations,
        as: "stations",
        include: [
          {
            model: db.Companies,
            as: "companies",
            attributes: ["name"],
          },
        ],
      },
    ],
    raw: false,
  });

  const rawLogs = logs.map((log) => log.toJSON());

  res.render("dashboard", {
    title: "Dashboard",
    seperator: "Fuldført",
    logs: rawLogs,
  });
});

app.get("/new-cleaning", async (req, res) => {
  try {
    const stations = await db.Stations.findAll({
      include: [
        {
          model: db.Companies,
          as: "companies",
        },
      ],
      raw: false,
    });

    const plainStations = stations.map((station) => station.toJSON());

    res.render("newCleaning", {
      title: "Ny rengøring",
      stations: plainStations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading page");
  }
});

app.post(
  "/new-cleaning",
  upload.fields([
    { name: "beforeImages", maxCount: 8 },
    { name: "afterImages", maxCount: 8 },
  ]),
  async (req, res) => {
    try {
      const userId = req.session.user.id;

      const newLog = await db.Logs.create({
        stationId: req.body.stationId,
        comment: req.body.comment,
        userId: userId,
      });

      const uploadImages = async (files, isBefore) => {
        if (!files) return;

        for (const file of files) {
          const resizedFilename = `resized-${file.filename}`;
          const resizedPath = path.join(
            __dirname,
            "image-uploads",
            resizedFilename
          );

          await sharp(file.path)
            .resize(800, 600, { fit: "inside" })
            .jpeg({ quality: 80 })
            .toFile(resizedPath);

          fs.unlinkSync(file.path);

          await db.Images.create({
            logId: newLog.id,
            path: `image-uploads/${resizedFilename}`,
            isBefore: isBefore,
          });
        }
      };

      await uploadImages(req.files.beforeImages, true);
      await uploadImages(req.files.afterImages, false);

      res.redirect(`/new-cleaning`);
    } catch (error) {
      console.error("Upload fejl:", error);
      res.status(500).send("Fejl ved upload af billeder");
    }
  }
);

app.get("/users", async (req, res) => {
  const users = await db.Users.findAll({ raw: true });

  res.render("users", {
    title: "Personale",
    users: users,
  });
});

app.get("/add-user", (req, res) => {
  res.render("addUser", {
    title: "Tilføj bruger",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await db.Users.findByPk(id, {
    include: [
      {
        model: db.Stations,
        as: "stations",
        through: { attributes: [] },
        include: [
          {
            model: db.Companies,
            as: "companies",
            attributes: ["name"],
          },
        ],
      },
    ],
    raw: false,
  });

  if (!user) return res.status(404).send("Bruger ikke fundet");

  const rawUser = user.toJSON();

  res.render("editUser", {
    title: "Rediger bruger",
    message: "Velkommen homie gratt gratt!",
    user: rawUser,
    backUrl: "/users",
  });
});

app.post("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const {
      "first-name": firstName,
      "last-name": lastName,
      email,
    } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).send("Alle felter skal udfyldes");
    }

    await db.Users.update(
      {
        firstName,
        lastName,
        email,
      },
      { where: { id } }
    );

    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fejl ved opdatering af bruger");
  }
});

app.post("/users/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db.Users.destroy({ where: { id } });

    if (!deleted) return res.status(404).send("Bruger ikke fundet");

    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fejl ved sletning af bruger");
  }
});

app.get("/products", async (req, res) => {
  const products = await db.Products.findAll({ raw: true });

  res.render("products", {
    title: "Produkter",
    message: "Velkommen homie gratt gratt!",
    products: products,
  });
});

app.get("/add-product", (req, res) => {
  res.render("addProduct", {
    title: "Tilføj produkt",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/stations", async (req, res) => {
  const stations = await db.Stations.findAll({
    include: [
      {
        model: db.Companies,
        as: "companies",
      },
    ],
    order: [["postalCode", "ASC"]],
    raw: false,
  });

  const plainStations = stations.map((station) => station.toJSON());

  res.render("stations", {
    title: "Stationer",
    message: "Velkommen homie gratt gratt!",
    stations: plainStations,
  });
});

app.get("/add-station", async (req, res) => {
  try {
    const companies = await db.Companies.findAll({ raw: true });

    res.render("addStation", {
      title: "Tilføj Station",
      message: "Velkommen homie gratt gratt!",
      companies: companies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading page");
  }
});

app.post("/add-station", async (req, res) => {
  try {
    await db.Stations.create({
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      companyId: req.body.companyId,
    });
    res.redirect("/stations");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.get("/stations/:id", async (req, res) => {
  const { id } = req.params;

  const companies = await db.Companies.findAll({ raw: true });

  const station = await db.Stations.findByPk(id, { raw: true });

  if (!station) return res.status(404).send("Bruger ikke fundet");

  res.render("editStations", {
    title: "Rediger station",
    message: "Velkommen homie gratt gratt!",
    station,
    companies,
  });
});

app.post("/stations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const {
      address: address,
      postalCode: postalCode,
      city: city,
      companyId: companyId,
    } = req.body;

    if (!address || !postalCode || !city) {
      return res.status(400).send("Alle felter skal udfyldes");
    }

    await db.Stations.update(
      {
        address,
        postalCode,
        city,
        companyId,
      },
      { where: { id } }
    );

    res.redirect("/stations");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fejl ved opdatering af bruger");
  }
});

app.post("/stations/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db.Stations.destroy({ where: { id } });

    if (!deleted) return res.status(404).send("Station ikke fundet");

    res.redirect("/stations");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fejl ved sletning af station");
  }
});

app.get("/addCompanies", async (req, res) => {
  try {
    const companies = await db.Companies.findAll({ raw: true });

    res.render("addCompanies", {
      title: "Tilføj firma",
      companies: companies,
    });
  } catch (error) {
    console.error(error);
    res.status("Error getting companies");
  }
});

app.post("/addCompanies", async (req, res) => {
  try {
    await db.Companies.create({
      name: req.body.name,
    });
    res.redirect("/addCompanies");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

Handlebars.registerHelper("buttonVariant", function (variant) {
  switch (variant) {
    case "secondary":
      return "button--secondary";
    case "outline":
      return "button--outline";
    case "ghost":
      return "button--ghost";
    case "destructive":
      return "button--destructive";
    default:
      return "button--primary";
  }
});

// vi skal have en const HOST = process.env.HOST || '0.0.0.0';
// her skal vi have HOST på app.listen(PORT, HOST, () => { console.log('Server running on http://${HOST}:${PORT}'); })
app.listen(PORT);

//Vi skal måske have en js side dedikeret til CRUD metoder, her prøves det lige af:::

//Her er en test funktion for at se om der er hul igennem til databasen. Den trækker alt fra en tabel, her er det Users, og laver det om til en json string, null her betyder at den skal vise alt som det er, og 2 er den indentation den skal bruge.! :D
// async function testDatabase() {
// 	try {
// 		const results = await db.Users.findAll();
// 		console.log("Brugere fra databasen:", JSON.stringify(results, null, 2));
// 	} catch (error) {
// 		console.error("Database fejl:", error);
// 	}
// }

// testDatabase();
