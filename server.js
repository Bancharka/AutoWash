const express = require("express");
const { engine } = require("express-handlebars");
const { type } = require("os");
const path = require("path");
const helpers = require("./helpers/helpers");
const Handlebars = require("handlebars");
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
app.use(express.urlencoded({ extended: true }));

//Det her er basically routing som vi har gjort i

app.get("/", async (req, res) => {
	try {
		const users = await db.Users.findAll({ raw: true });

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

app.post("/create-user", async (req, res) => {
	try {
		await db.Users.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			isAdmin: false,
		});
		res.redirect("/");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error");
	}
});

app.get("/dashboard", (req, res) => {
	res.render("dashboard", {
		title: "Dashboard",
		seperator: "Fuldført",
	});
});

app.get("/new-cleaning", (req, res) => {
	res.render("newCleaning", {
		title: "Ny rengøring",
		message: "Velkommen homie gratt gratt!",
	});
});

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

	const user = await db.Users.findByPk(id, { raw: true });

	if (!user) return res.status(404).send("Bruger ikke fundet");

	res.render("editUser", {
		title: "Rediger bruger",
		message: "Velkommen homie gratt gratt!",
		user,
	});
});

app.post("/users/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const { "first-name": firstName, "last-name": lastName, email } = req.body;

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
				as: "Companies",
			},
		],
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
			title: "Tilføj produkt",
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

app.get("/add-companies", async (req, res) => {
	try {
		const companies = await db.Companies.findAll({ raw: true });

		res.render("add-companies", {
			title: "Tilføj firma",
			companies: companies,
		});
	} catch (error) {
		console.error(error);
		res.status("Error getting companies");
	}
});

app.post("/add-companies", async (req, res) => {
	try {
		await db.Companies.create({
			name: req.body.name,
		});
		res.redirect("/add-companies");
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
