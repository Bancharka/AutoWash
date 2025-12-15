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
const { isAuthenticated, isNotAuthenticated } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT;

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
