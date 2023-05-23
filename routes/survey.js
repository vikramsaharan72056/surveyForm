const express = require("express");
const requireLogin = require("../middleware/requireLogin");
const routerC = express.Router();
require("../middleware/requireLogin");
const Survey = require("../models/survey");

routerC.post("/createSurvey", async (req, res) => {
  const { name, description, selectedOption, startDate, endDate } = req.body;

  try {
    const survey = new Survey({
      name,
      description,
      selectedOption,
      startDate,
      endDate,
    });

    await survey.save();
    console.log(survey);
    res.status(200).json(survey);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
});

routerC.get("/surveys", async (req, res) => {
  try {
    const data = await Survey.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = routerC;
