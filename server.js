const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

const PORT = 3000;

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views/");

// Bestemmer hvor vi henter static filer fra (f.eks CSS)
app.use(express.static(path.join(__dirname, "public")));

//Det her er basically routing som vi har gjort i
app.get("/", (req, res) => {
  res.render("login", {
    title: "Hjem",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/new-cleaning", (req, res) => {
  res.render("newCleaning", {
    title: "Ny rengøring",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/add-user", (req, res) => {
  res.render("addUser", {
    title: "Tilføj bruger",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/products", (req, res) => {
  res.render("products", {
    title: "Produkter",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/stations", (req, res) => {
  res.render("stations", {
    title: "Stationer",
    message: "Velkommen homie gratt gratt!",
  });
});

app.get("/add-station", (req, res) => {
  res.render("addUser", {
    title: "Tilføj bruger",
    message: "Velkommen homie gratt gratt!",
  });
});

app.listen(PORT);
