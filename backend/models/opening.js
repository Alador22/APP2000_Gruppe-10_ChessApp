const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const openingSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  moves: { type: String, required: true },
  description: { type: String, required: true },
  creator_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Opening = mongoose.model("Opening", openingSchema);

module.exports = Opening;
