const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Survey = new mongoose.model("survey", surveySchema);

module.exports = Survey;
