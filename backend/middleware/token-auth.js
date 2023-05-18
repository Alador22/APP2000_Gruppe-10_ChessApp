const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const checkToken = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Ugyldige inndata, vennligst prøv igjen.", 422);
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      elo: decodedToken.elo,
      admin: decodedToken.admin,
    };
    next();
  } catch (err) {
    const error = new HttpError("authentication failed", 500);
    return next(error);
  }
};

exports.checkToken = checkToken;
