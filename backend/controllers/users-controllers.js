const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//vi får alle brukerne på User collection uten deres passord
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Henting av brukere mislyktes, Prøv igjen senere.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

//koden som kjøres for å opprette en bruker på databasen
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Ugyldige inndata, vennligst prøv igjen.", 422));
  }

  const { name, email, password } = req.body;
  //sjekker om brukeren finnes allerede i databasen
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("noe gikk galt. Prøv igjen senere.", 500);
    return next(error);
  }

  if (existingUser) {
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
  const createdUser = new User({
    name,
    email,
    image: "https://web01.usn.no/~lonnesta/Tor_Lonnestad.jpg",
    password: hashedPassword,
    elo: 1000,
    admin: false,
  });

  try {
    await User.create(createdUser);
  } catch (err) {
    const error = new HttpError("noe gikk galt, vennligst prøv igjen.", 500);
    return next(error);
  }
  /*
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "Cheesy_Chess",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};*/
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //sjekker om brukeren finnes i databasen
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Innlogging mislyktes, Prøv igjen senere.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke logge deg på nå.",
      401
    );
    return next(error);
  }
  //vi bruker bcrypt-biblioteket for å sjekke om passordet som er gitt samsvarer med den hashed passordet som er lagret i databasen
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
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
  /*
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "Cheesy_Chess",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
*/
  res.json({ message: "Logged in!" });
};

//slette brukeren ved først å autentisere
const deleteUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //update this so users only need to use their passwords to delete their accounts
  let findUser;
  try {
    findUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Noe gikk galt, vennligst prøv igjen", 500);
    return next(error);
  }

  if (!findUser) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke slette kontoen",
      404
    );
    return next(error);
  }
  //add authorization to make sure that admins dont need password to acess this and if it isnt an admin then password is required*

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
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, vennligst prøv igjen senere.",
      404
    );
    return next(error);
  }
  res.status(200).json("kontoen har blitt slettet!");
};

const logOut = (req, res, next) => {
  try {
    //req.session.destroy();
  } catch (err) {
    const error = new HttpError("Noe gikk galt, vennligst prøv igjen.", 404);
    return next(error);
  }

  res.status(200).json("Du har blitt logget ut!");
};

const updateRole = async (req, res, next) => {
  const email = req.body.email;
  //add an authorization to make sure only admins are access this*
  let findUser;
  try {
    findUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Noe gikk galt, vennligst prøv igjen", 500);
    return next(error);
  }

  if (!findUser) {
    const error = new HttpError(
      "Ugyldig inndata, kunne ikke oppdatere kontoen",
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
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.logOut = logOut;
exports.updateRole = updateRole;
