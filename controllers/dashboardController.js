const db = require("../models");

exports.getDashboard = async (req, res) => {
  const id = req.session.user.id;

  const logs = await db.Logs.findAll({
    where: { userId: id },
    include: [
      {
        model: db.Stations,
        as: "stations",
        include: [
          { model: db.Companies, as: "companies", attributes: ["name"] },
        ],
      },
    ],
  });

  res.render("dashboard", {
    title: "Dashboard",
    logs: logs.map((log) => log.toJSON()),
    logout: true,
  });
};
