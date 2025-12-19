const db = require("../models");

exports.getCompany = async (req, res) => {
  const companies = await db.Companies.findAll({ raw: true });

  res.render("addCompany", {
    title: "Tilføj firma",
    companies,
    backUrl: "/stations",
  });
};

exports.postCompany = async (req, res) => {
  await db.Companies.create({
    name: req.body.name,
  });

  res.redirect("/add-company");
};
