const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid Email Address.",
    ],
  },
  password: {
    type: String,
  },

  confirm_password: {
    type: String,
  },

  profile_pic: {
    type: String,
  },
});

const users = mongoose.model("usertable", userSchema);

module.exports = users;
