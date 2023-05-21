const express = require("express");
const routerB = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { secretKey } = require("../keys");
const secretKey = "abcdefghijklm";
const requireLogin = require("../middleware/requireLogin");

routerB.post("/signup", (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!email || !name || !password || !cpassword) {
    res.json({ status: 401, error: "please fill all the details" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        res.status(406).json({ error: "user already exists with that email" });
        console.log("user already exists");
      } else {
        const hashedpassword = bcrypt
          .hash(password, 12)
          .then((hashedpassword) => {
            const user = new User({
              name: name,
              email: email,
              password: hashedpassword,
              cpassword: hashedpassword,
            });

            user
              .save()
              .then((user) => {
                res.status(200).json({ message: "saved successfully" });
              })
              .catch((err) => {
                console.log(err.message);
              });
          });
      }
    })
    .catch((err) => {
      res.json({ message: err.message, error: "line 38 error" });
    });
});

routerB.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(402).json({ error: "please provide all details" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        res.json({ status: 422, error: "Invalid username or password" });
      }
      bcrypt.compare(password, savedUser.password).then((domatch) => {
        if (domatch) {
          //res.json({ message: "successfully signed in" });
          const token = jwt.sign({ _id: savedUser._id }, secretKey);
          const { _id, name, email } = savedUser;
          res.status(201).json({ token, user: { _id, name, email } });
        } else {
          res.json({ message: "Invalid username or password" });
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = routerB;
