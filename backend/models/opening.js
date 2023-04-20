const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const openingSchema = new Schema({
  name: { type: String, required: true },
  moves: { type: String, required: true },
  description: { type: String, required: true },
  creator_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Opening", openingSchema);
