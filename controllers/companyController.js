const db = require("../models");

exports.getCompanies = async (req, res) => {
  const companies = await db.Companies.findAll({ raw: true });

  res.render("addCompanies", {
    title: "Tilføj firma",
    companies,
  });
};

exports.postCompanies = async (req, res) => {
  await db.Companies.create({
    name: req.body.name,
  });

  res.redirect("/addCompanies");
};
