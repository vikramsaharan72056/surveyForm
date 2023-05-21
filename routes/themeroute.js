const express = require("express");
const router = express.Router();
const Theme = require("../model");

router.post("/savetheme", async (req, res) => {
  try {
    const theme = new Theme(req.body);
    const savedtheme = await theme.save();
    res.status(200).json(savedtheme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/themes", async (req, res) => {
  try {
    const themes = await Theme.find();
    res.status(200).json(themes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
