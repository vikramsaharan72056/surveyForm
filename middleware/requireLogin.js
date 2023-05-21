const jwt = require("jsonwebtoken");
const secretKey = process.env.secret_key;
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "you must login first" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      res.status(401).json({ error: "you must be login" });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;

      next();
    });
  });
};
