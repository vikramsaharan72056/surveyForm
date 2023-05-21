const mongoose = require("mongoose");
const URL =
  "mongodb+srv://root:root@cluster0.brmgqnv.mongodb.net/surveyform?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
