const express = require("express");
const { engine } = require("express-handlebars");
const { type } = require("os");
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("./models");

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
app.get("/", async (req, res) => {
	try {
		const users = await db.Users.findAll({ raw: true });

		res.render("login", {
			title: "Hjem",
			message: "Velkommen homie gratt gratt!",
			seperator: "Før billeder",
			users: users,
		});
	} catch (error) {}
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
		title: "Tilføj bruger",
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

// vi skal have en const HOST = process.env.HOST || '0.0.0.0';
// her skal vi have HOST på app.listen(PORT, HOST, () => { console.log('Server running on http://${HOST}:${PORT}'); })
app.listen(PORT);

//Her er en test funktion for at se om der er hul igennem til databasen. Den trækker alt fra en tabel, her er det Users, og laver det om til en json string, null her betyder at den skal vise alt som det er, og 2 er den indentation den skal bruge.! :D
async function testDatabase() {
	try {
		const results = await db.Users.findAll();
		console.log("Brugere fra databasen:", JSON.stringify(results, null, 2));
	} catch (error) {
		console.error("Database fejl:", error);
	}
}

testDatabase();
