const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Json_token = require("jsonwebtoken");
const upload = require("../middleware/fileupload");

const router = new express.Router();
const verifyUser = require("../middleware/auth");

//user registration
router.post("/user/register", function (req, res) {
  const name = req.body.username;
  const email = req.body.email;
  const passwd = req.body.password;
  const cpasswd = req.body.confirm_password;

  userModel.findOne({ username: name }).then(function (user) {
    if (user) {
      res.send("user already exists");
    } else {
      if (passwd != cpasswd) {
        res.send("password didn't match");
      } else {
        bcrypt.hash(passwd, 10, function (err, hash1) {
          const data = new userModel({
            username: name,
            email: email,
            password: hash1,
          });
          data
            .save()
            .then(function (result) {
              res.status(201).json({ message: "Registered successfully" });
            })
            .catch(function (error) {
              res.status(500).json({ message: error });
            });
        });
      }
    }
  });
});

//Login authentication
router.post("/user/login", function (req, res) {
  const user = req.body.username;
  const pass = req.body.password;

  userModel
    .findOne({ username: user })
    .then(function (data) {
      if (data === null) {
        return res.status(403).json({ message: "Invalid Login" });
      }
      bcrypt.compare(pass, data.password, function (err, result) {
        if (result === false) {
          return res.status(403).json({ message: "Invalid Login" });
        }
        const token = Json_token.sign({ YourId: data._id }, "Anysecretkey");
        res.status(200).json({ message: "Login Success" });
      });
    })
    .catch();
});

module.exports = router;
