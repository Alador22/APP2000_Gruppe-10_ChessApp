const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Opening = require("../models/opening");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//koden som kjøres for å opprette en bruker på databasen
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Ugyldige inndata, vennligst prøv igjen.", 422));
  }

  const { name, email, password } = req.body;

  let alreadyUser = await User.findOne({ email: email });

  if (alreadyUser) {
    const error = new HttpError(
      "Brukeren eksisterer allerede, vennligst logg på i stedet.",
      422
    );
    return next(error);
  }

  //passordet er saltet og hashet før det sendes til databasen
  let hashedPassword;
  const rounds = 12;
  try {
    hashedPassword = await bcrypt.hash(password, rounds);
  } catch (err) {
    const error = new HttpError("Kunne ikke opprette bruker, prøv igjen.", 500);
    return next(error);
  }

  //denne strukturen sendes som et json format til databasen slik at brukeren kan lagres
  const newUser = new User({
    name,
    email,
    image: "https://web01.usn.no/~lonnesta/Tor_Lonnestad.jpg",
    password: hashedPassword,
    elo: 1000,
    admin: false,
  });

  try {
    await User.create(newUser);
  } catch (err) {
    const error = new HttpError("noe gikk galt, vennligst prøv igjen.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        elo: newUser.elo,
        admin: newUser.admin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
      { algorithm: "RS256" }
    );
  } catch (err) {
    const error = new HttpError(
      "kunne ikke registrere deg,vennligst prøv igjen",
      500
    );
    return next(error);
  }
  res.status(201).json({ token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //sjekker om brukeren finnes i databasen

  let alreadyUser = await User.findOne({ email: email });

  if (!alreadyUser) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke logge deg på nå.",
      401
    );
    return next(error);
  }
  //vi bruker bcrypt-biblioteket for å sjekke om passordet som er gitt samsvarer med den hashed passordet som er lagret i databasen
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, alreadyUser.password);
  } catch (err) {
    const error = new HttpError(
      "Kunne ikke logge deg på, vennligst prøv igjen.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke logge deg på nå.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: alreadyUser.id,
        email: alreadyUser.email,
        elo: alreadyUser.elo,
        admin: alreadyUser.admin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
      { algorithm: "RS256" }
    );
  } catch (err) {
    const error = new HttpError(
      "kunne ikke logge deg på,vennligst prøv igjen.",
      500
    );
    return next(error);
  }
  res.status(201).json({ token: token });
};

//slette brukeren ved først å autentisere
const deleteUser = async (req, res, next) => {
  const email = req.userData.email;
  const password = req.body.password;
  const creator_id = req.userData.userId;

  let findUser = await User.findOne({ email: email });

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, findUser.password);
  } catch (err) {
    const error = new HttpError("Noe gikk galt, vennligst prøv igjen.", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke slette kontoen",
      401
    );
    return next(error);
  }

  try {
    await User.deleteOne({ email: findUser.email });
    await Opening.deleteMany({ creator_id });
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, vennligst prøv igjen senere.",
      404
    );
    return next(error);
  }
  res.status(200).json("kontoen har blitt slettet!");
};

const changePass = async (req, res, next) => {
  const email = req.userData.email;
  const oldPassword = req.body.password;
  const newPass = req.body.newPass;

  let findUser = await User.findOne({ email: email });

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(oldPassword, findUser.password);
  } catch (err) {
    const error = new HttpError("Noe gikk galt, vennligst prøv igjen.", 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke endre passord",
      401
    );
    return next(error);
  }

  let isSamePassword = false;
  try {
    isSamePassword = await bcrypt.compare(newPass, findUser.password);
  } catch (err) {
    const error = new HttpError("Noe gikk galt, vennligst prøv igjen.", 500);
    return next(error);
  }
  if (isSamePassword) {
    const error = new HttpError("du har allerede dette som passord!", 401);
    return next(error);
  }

  let rounds;
  let password;
  try {
    rounds = 12;
    password = await bcrypt.hash(newPass, rounds);
    await User.updateOne({ email }, { password: password });
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, vennligst prøv igjen senere.",
      404
    );
    return next(error);
  }
  res.status(200).json("passordet er oppdatert!");
};

const updateAdminRole = async (req, res, next) => {
  const email = req.body.email;
  const isAdmin = req.userData.admin;

  if (!isAdmin) {
    const error = new HttpError(
      "du trenger en administratorrolle for å gjøre denne endringen ",
      404
    );
    return next(error);
  }

  let findUser = await User.findOne({ email: email });

  if (!findUser) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke finne kontoen",
      404
    );
    return next(error);
  }

  let response;
  if (findUser.admin === true) {
    try {
      await User.updateOne({ email }, { admin: false });
    } catch (err) {
      const error = new HttpError("Noe gikk galt, vennligst prøv igjen.", 404);
      return next(error);
    }
    response = "administrator rollen er fjernet";
  } else {
    try {
      await User.updateOne({ email }, { admin: true });
    } catch (err) {
      const error = new HttpError("Noe gikk galt, vennligst prøv igjen.", 404);
      return next(error);
    }
    response = "brukeren er nå administrator";
  }

  res.status(200).json(response);
};

const adminDeleteUser = async (req, res, next) => {
  const email = req.body.email;
  let creator_id;
  const isAdmin = req.userData.admin;

  if (!isAdmin) {
    const error = new HttpError(
      "du trenger en administratorrolle for å gjøre denne endringen ",
      404
    );
    return next(error);
  }

  let findUser = await User.findOne({ email: email });

  if (!findUser) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke finne kontoen",
      404
    );
    return next(error);
  }

  creator_id = findUser.id;

  try {
    await User.deleteOne({ email: findUser.email });
    await Opening.deleteMany({ creator_id });
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, vennligst prøv igjen senere.",
      404
    );
    return next(error);
  }
  res.status(200).json("kontoen har blitt slettet!");
};

//make an admin banning function and another function for forgot password
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.updateAdminRole = updateAdminRole;
exports.adminDeleteUser = adminDeleteUser;
exports.changePass = changePass;
