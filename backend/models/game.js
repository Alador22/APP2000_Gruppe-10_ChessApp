const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  player1_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  player2_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: false },
  moves: [
    {
      player_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
      from: { type: String, required: true },
      to: { type: String, required: true },
      move_time: { type: Date, required: true },
    },
  ],
  result: { type: String, required: false, enum: ["won", "lost", "draw"] },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
