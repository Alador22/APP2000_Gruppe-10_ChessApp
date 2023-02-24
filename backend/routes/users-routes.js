const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();
// Denne filen er for ruting, så den tar det som er skrevet etter /api/... og tar dem til riktig funksjonen på filen "User-Controllers"
router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
