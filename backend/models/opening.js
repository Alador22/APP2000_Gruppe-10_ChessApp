const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const openingSchema = new Schema({
  name: { type: String, required: true, trim: true },
  moves: { type: String, required: true },
  description: String,
  creator_id: { type: mongoose.Types.ObjectId, ref: "User" },
});

openingSchema.index({ name: 1, creator_id: 1 }, { unique: true });
const Opening = mongoose.model("Opening", openingSchema);

module.exports = Opening;
