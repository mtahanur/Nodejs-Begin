const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  resetToken: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  resetTokenExpires: {
    type: Date
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;