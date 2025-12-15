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
          {
            model: db.Companies,
            as: "companies",
            attributes: ["name"],
          },
        ],
      },
    ],
  });

  if (!user) return res.status(404).send("Bruger ikke fundet");

  res.render("editUser", {
    title: "Rediger bruger",
    user: user.toJSON(),
    backUrl: "/users",
  });
};

exports.postEditUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  await db.Users.update({ firstName, lastName, email }, { where: { id } });

  res.redirect("/users");
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.Users.destroy({ where: { id } });
  res.redirect("/users");
};
