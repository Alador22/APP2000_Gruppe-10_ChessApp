const express = require("express");
const { check } = require("express-validator");

const gamesController = require("../controllers/games-controllers");

const router = express.Router();

// Get all games
router.get("/", gamesController.getGames);

// Create a new game
router.post(
  "/start",
  [
    check("player1_id").not().isEmpty(),
    check("player2_id").not().isEmpty(),
    check("start_time").isISO8601(),
  ],
  gamesController.startGame
);

// Update a game by its _id (e.g., add moves, update result)
router.patch("/:gid", [], gamesController.updateGame);

module.exports = router;
