const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/27017/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

var MONODB_URI = process.env.MONGODB_URI || "mongodb://localhost/27017/mongoHeadlines";

mongoose.connect(MONODB_URI);
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});