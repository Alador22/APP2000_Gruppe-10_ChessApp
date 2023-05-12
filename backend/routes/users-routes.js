const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();
// Denne filen er for ruting, så den tar det som er skrevet etter /api/... og tar dem til riktig funksjonen på filen "User-Controllers"
router.get("/", usersController.getUsers);

//Route for å registrere en bruker
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
//Route for å logge seg inn
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.login
);

//Route for å slette brukeren
router.delete(
  "/delete",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.deleteUser
);
router.get("/logout", usersController.logOut);

router.patch(
  "/update",

  check("email").normalizeEmail().isEmail(),

  usersController.updateRole
);

module.exports = router;
