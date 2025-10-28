const express = require("express");
const { engine } = require("express-handlebars");
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

//Det her er basically routing som vi har gjort i
app.get("/", (req, res) => {
    res.render("home", {
        title: "Hjem",
        message: "Velkommen homie gratt gratt!",
    });
});

app.get('/products', (req, res) => {
    //hapser data fra databasen
        const products = [
            { id: 1, name: 'Laptop', price: 5000, inStock: true },
            { id: 2, name: 'Mouse', price: 200, inStock: true },
            { id: 3, name: 'Keyboard', price: 400, inStock: false },
            { id: 4, name: 'Monitor', price: 2000, inStock: true },
        ];
        res.render('products', {
            title: 'Products', 
            products: products,
            totalProducts: products.length
        });
    });

app.listen(PORT);
