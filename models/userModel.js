const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, lowercase: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
          value
        );
      },
      message:
        "Password must be at least 8 characters long and contain both letters and numbers",
    },
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
