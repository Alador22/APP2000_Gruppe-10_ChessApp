const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Game = require("../models/game");

// Get all games
const getGames = async (req, res, next) => {
  let games;
  try {
    games = await Game.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching games failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ games: games.map((game) => game.toObject({ getters: true })) });
};
//get all games by user_id

// Start a new game
const startGame = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { player1_id, player2_id, start_time } = req.body;

  const newGame = new Game({
    player1_id,
    player2_id,
    start_time,
    moves: [],
  });

  try {
    await newGame.save();
  } catch (err) {
    const error = new HttpError("Creating game failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ game: newGame });
};
// Update a game by its id
const updateGame = async (req, res, next) => {
  const gameId = req.params.gid;

  const { moves, end_time, result } = req.body;

  let game;
  try {
    game = await Game.findById(gameId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the game.",
      500
    );
    return next(error);
  }

  if (!game) {
    const error = new HttpError(
      "Could not find a game with the provided ID.",
      404
    );
    return next(error);
  }

  // Update moves, end_time and result
  if (moves) {
    // Validate moves, e.g., ensure player_id, from, and to fields are present for each move
    const validMoves = moves.every(
      (move) => move.player_id && move.from && move.to
    );

    if (!validMoves) {
      const error = new HttpError("Invalid move data provided.", 422);
      return next(error);
    }

    // Append new moves to the existing moves array
    game.moves.push(...moves);
  }
  if (end_time) {
    game.end_time = end_time;
  }
  if (result) {
    game.result = result;
  }

  try {
    await game.save();
  } catch (err) {
    const error = new HttpError("Updating game failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ game: game.toObject({ getters: true }) });
};

exports.getGames = getGames;
exports.startGame = startGame;
exports.updateGame = updateGame;
