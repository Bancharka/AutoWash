const db = require("../models");

exports.getUsers = async (req, res) => {
  const users = await db.Users.findAll({ raw: true });

  res.render("users", {
    title: "Personale",
    users,
    logout: true,
  });
};

exports.getEditUser = async (req, res) => {
  const { id } = req.params;

  const user = await db.Users.findByPk(id, {
    include: [
      {
        model: db.Stations,
        as: "stations",
        through: { attributes: [] },
        include: [
          { model: db.Companies, as: "companies", attributes: ["name"] },
        ],
      },
    ],
  });

  if (!user) return res.status(404).send("Bruger ikke fundet");

  const allStations = await db.Stations.findAll({
    include: [{ model: db.Companies, as: "companies", attributes: ["name"] }],
    order: [
      [{ model: db.Companies, as: "companies" }, "name", "ASC"],
      ["address", "ASC"],
      ["postalCode", "ASC"],
    ],
  });

  const stationItems = allStations.map((station) => ({
    id: station.id,
    text: `${station.companies.name}, ${station.address}, ${station.postalCode}`,
  }));

  res.render("editUser", {
    title: "Rediger bruger",
    user: user.toJSON(),
    stationItems,
    backUrl: "/users",
  });
};

exports.postEditUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, isAdmin, stationIds } = req.body;

  const adminValue = !!isAdmin;

  await db.Users.update(
    { firstName, lastName, email, isAdmin: adminValue },
    { where: { id } }
  );

  const user = await db.Users.findByPk(id);

  await user.setStations([]);

  if (stationIds) {
    const stations = await db.Stations.findAll({ where: { id: stationIds } });
    await user.addStations(stations);
  }

  res.redirect("/users");
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.Users.destroy({ where: { id } });
  res.redirect("/users");
};
