const db = require("../models");

exports.getStations = async (req, res) => {
  const stations = await db.Stations.findAll({
    include: [{ model: db.Companies, as: "companies" }],
    order: [["postalCode", "ASC"]],
    raw: false,
  });

  res.render("stations", {
    title: "Stationer",
    stations: stations.map((s) => s.toJSON()),
    logout: true,
  });
};

exports.getAddStation = async (req, res) => {
  const companies = await db.Companies.findAll({ raw: true });

  res.render("addStation", {
    title: "Tilføj Station",
    companies,
    backUrl: "/stations",
  });
};

exports.postAddStation = async (req, res) => {
  await db.Stations.create({
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city,
    companyId: req.body.companyId,
  });

  res.redirect("/stations");
};

exports.getEditStation = async (req, res) => {
  const { id } = req.params;

  const companies = await db.Companies.findAll({ raw: true });
  const station = await db.Stations.findByPk(id, { raw: true });

  if (!station) return res.status(404).send("Station ikke fundet");

  res.render("editStations", {
    title: "Rediger station",
    station,
    companies,
    backUrl: "/stations",
  });
};

exports.postEditStation = async (req, res) => {
  const { id } = req.params;
  const { address, postalCode, city, companyId } = req.body;

  await db.Stations.update(
    { address, postalCode, city, companyId },
    { where: { id } }
  );

  res.redirect("/stations");
};

exports.deleteStation = async (req, res) => {
  const { id } = req.params;

  await db.Stations.destroy({ where: { id } });

  res.redirect("/stations");
};
