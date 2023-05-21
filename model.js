const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  selectedOption: String,
  themeName: String,
  themeType: String,
  fromType: String,
  allQuestionMandatory: String,
  enableSkip: String,
  optionType: String,
  font: String,
  color: String,
});

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
