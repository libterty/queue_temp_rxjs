const express = require("express");
const app = express();
const router = require("./router");
const bodyParser = require("body-parser");

const nosqlConnect = require('./connection')

nosqlConnect();
app.use(bodyParser.json());
app.use("/", router);

app.listen(3030, () => {
  console.log("port listen on 3030");
});