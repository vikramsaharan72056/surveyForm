const express = require("express");
const app = express();
const cors = require("cors");
require("./connection");
const router = require("./routes/themeroute");
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8888, () => {
  console.log("server is listening at 8888");
});
module.exports = app;
