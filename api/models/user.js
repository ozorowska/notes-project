const mongoose = require("mongoose");

// Schemat uzytkownika
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
