const db = require("../models");

exports.getProducts = async (req, res) => {
  const products = await db.Products.findAll({ raw: true });

  res.render("products", {
    title: "Produkter",
    products,
    logout: true,
  });
};

exports.getAddProduct = (req, res) => {
  res.render("addProduct", {
    title: "Tilføj produkt",
    backUrl: "/products",
  });
};

exports.postAddProduct = async (req, res) => {
  await db.Products.create({
    name: req.body.name,
  });

  res.redirect("/products");
};
