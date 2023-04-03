const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const openingSchema = new Schema({
  name: { type: String, required: true },
  moves: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Opening", openingSchema);
