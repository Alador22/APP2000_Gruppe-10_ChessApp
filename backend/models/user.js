const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
//mongoose gir muligheten for å lage en skjema for hvordan user Collection skal se ut
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  elo: { type: Number },
  admin: { Boolean },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
