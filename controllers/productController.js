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

exports.getEditProduct = async (req, res) => {
  const { id } = req.params;

  const product = await db.Products.findByPk(id);

  if (!product) {
    return res.status(404).send("Produkt ikke fundet");
  }

  res.render("editProduct", {
    title: "Rediger produkt",
    product: product.toJSON(),
    backUrl: "/products",
  });
};

exports.postEditProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await db.Products.update({ name }, { where: { id } });

  res.redirect("/products");
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  await db.Products.destroy({ where: { id } });

  res.redirect("/products");
};
