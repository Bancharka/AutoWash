const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const helpers = require("./helpers/helpers");
const Handlebars = require("handlebars");

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

// Middleware der giver hver route adgang til currentPath, som bruges til at se hvilken url man er på
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

//Det her er basically routing som vi har gjort i
app.get("/", (req, res) => {
  res.render("login", {
    title: "Hjem",
    message: "Velkommen homie gratt gratt!",
    seperator: "Før billeder",
    placeholderText: "Dynamisk placeholder",
    label: "Placeholder",
    value: "Example",
    value1: "Example",
    value2: "Example",
    value3: "Example",
    value4: "Example",
    testItems: ["Test1", "Test2", "Test3"]
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

app.get("/users", (req, res) => {
  res.render("users", {
    title: "Personale",
    dashtitle: "Gitte Nielsen"
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

app.listen(PORT);
