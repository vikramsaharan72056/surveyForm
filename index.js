const express = require("express");
const app = express();
require("./connection");

app.listen(8888, () => {
  console.log("server is listening at 8888");
});
