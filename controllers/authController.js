require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../models");

exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Log ind",
    showgraphic: true,
    hideHeader: true,
  });
};

exports.getRegister = (req, res) => {
  res.render("register", {
    title: "Opret bruger",
    showgraphic: true,
    hideHeader: true,
  });
};

exports.postRegister = async (req, res) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    await db.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: false,
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.Users.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      req.session.error = "Forkert email eller adgangskode";
      return res.redirect("/login");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      req.session.error = "Forkert email eller adgangskode";
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.redirect("/login");
  }
};

exports.getLogout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
