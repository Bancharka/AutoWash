const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const { isNotAuthenticated } = require("../middleware/auth");
const db = require("../models");
const { raw } = require("mysql2");

router.post("/create-user", async (req, res) => {
  const saltRounds = 12; //skal i en env fil
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    await db.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: false,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.Users.findOne({
      where: { email },
      raw: true,
    });
    if (!user) {
      req.session.error = "Forkert email eller adgangskode";
      return res.redirect("/");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      req.session.error = "Forkert email eller adgangskode";
      return res.redirect("/");
    }

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error("login fejl", error);
    res.redirect("/");
  }
});

module.exports = router;
