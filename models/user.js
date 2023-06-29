const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  snsId: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: true,
    default: "local",
  },
});

module.exports = mongoose.model("user", userSchema);
