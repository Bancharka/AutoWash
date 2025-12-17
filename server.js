require("dotenv").config();

const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const Handlebars = require("handlebars");
const helpers = require("./helpers/helpers");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/users");
const stationRoutes = require("./routes/stations");
const companyRoutes = require("./routes/companies");
const productRoutes = require("./routes/products");
const cleaningRoutes = require("./routes/cleaning");
const { isNotAuthenticated } = require("./middleware/auth");
const fsPromises = require("fs").promises;

const app = express();
const PORT = process.env.PORT;

app.set("trust proxy", 1);

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
    helpers,
  })
);
app.set("view engine", "hbs");
app.set("views", "./views/");

Handlebars.registerHelper("json", (context) => JSON.stringify(context));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/image-uploads",
  express.static(path.join(__dirname, "image-uploads"))
);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

// Midlertidig løsning uden HTTPS
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
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
app.use(homeRoutes);
app.use(userRoutes);
app.use(stationRoutes);
app.use(companyRoutes);
app.use(productRoutes);
app.use(cleaningRoutes);

app.get("/login", isNotAuthenticated, (req, res) => {
  res.render("login", {
    title: "Log ind",
    showgraphic: true,
    hideHeader: true,
  });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Siden blev ikke fundet" });
});

async function cleanupTempFiles() {
  try {
    const tempDir = path.join(__dirname, "temp-image-upload");
    const files = await fsPromises.readdir(tempDir);

    let deletedCount = 0;
    for (const file of files) {
      try {
        await fsPromises.unlink(path.join(tempDir, file));
        deletedCount++;
      } catch (err) {
        console.warn(`Could not delete ${file}:`, err.message);
      }
    }
    console.log(`Cleaned up ${deletedCount} temp files`);
  } catch (err) {
    console.error("Cleanup error:", err.message);
  }
}

cleanupTempFiles();

setInterval(cleanupTempFiles, 24 * 60 * 60 * 1000);

const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
