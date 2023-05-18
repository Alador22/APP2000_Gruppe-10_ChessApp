const express = require("express");
const { check } = require("express-validator");
const tokenCheck = require("../middleware/token-auth");
const usersController = require("../controllers/users-controllers");

const router = express.Router();
// Denne filen er for ruting, så den tar det som er skrevet etter /api/... og tar dem til riktig funksjonen på filen "User-Controllers"

//Route for å registrere en bruker
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail().normalizeEmail(),
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

router.patch(
  "/settings",
  [
    check("password").isLength({ min: 6 }),
    check("newPass").isLength({ min: 6 }),
  ],
  tokenCheck.checkToken,
  usersController.changePass
);

//Route for å slette brukeren
router.delete(
  "/delete",
  check("password").isLength({ min: 6 }),
  tokenCheck.checkToken,
  usersController.deleteUser
);

router.patch(
  "/admin",
  check("email").normalizeEmail().isEmail(),
  tokenCheck.checkToken,
  usersController.updateAdminRole
);
router.delete(
  "/admin",
  check("email").normalizeEmail().isEmail(),
  tokenCheck.checkToken,
  usersController.adminDeleteUser
);

module.exports = router;
