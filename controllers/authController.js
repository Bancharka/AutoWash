require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../models");
const { raw } = require("mysql2");

exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Log ind",
    showgraphic: true,
    hideHeader: true,
    error: req.session.error,  //fejlbesked sendes til viewet
    success: req.session.success,
  });
  delete req.session.error; //sletning af fejlbesked, så den ikke vises i den næste session efter fejl
};

exports.getRegister = (req, res) => {
  res.render("register", {
    title: "Opret bruger",
    showgraphic: true,
    hideHeader: true,
    error: req.session.error,//fejlbesked sendes til viewet
    succes: req.session.succes,
  });
  delete req.session.error; //sletning af fejlbesked, så den ikke vises i den næste session efter fejl
};

exports.postRegister = async (req, res) => {

  try {

    //clara forbedringer = validation in the nation
    const { firstName, lastName, email, password, confirmPassword } = req.body; //en mere læsbar måde at skrive koden på, gør det lidt nemmere at se sig ud af valideringen

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      req.session.error = "Alle felter skal udfyldes";
      return res.redirect("/register");
    }

    //her køres en regEx(regular expression) til at teste om firstname og lastname indeholder tal (d = digits, altså tal) 
    //test retunerer true hvis det er sandt og false hvis ikke
    if (/\d/.test(firstName) || /\d/.test(lastName)) {
      req.session.error = "Navn kan ikke indeholde tal";
      return res.redirect("/register");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      req.session.error = "Ugyldig email adresse";
      return res.redirect("/register");
    }

    if (password !== confirmPassword) {
      req.session.error = "Kodeord matcher ikke";
      return res.redirect("/register");
    }

    if (password.length < 8) {
      req.session.error = "Kodeord skal være længere end 8 tegn";
      return res.redirect("/register");
    }

    const existingUser = await db.Users.findOne({
      where: { email },
      raw: true,
    });

    if (existingUser) {
      req.session.error = "En bruger med denne email eksisterer allerede";
      return res.redirect("/register");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    await db.Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin: false,
    });
    //også tilføjet en succes besked 

    req.session.success = "Bruger oprettet! Du kan nu logge ind."
    res.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    req.session.error = "Der opstod en fejl, prøv igen.";
    req.redirect("/register");
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
