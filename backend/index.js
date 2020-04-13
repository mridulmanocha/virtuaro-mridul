var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");


var corsOptions = {
  origin: true,
  optionsSuccessStatus: 204,
  credentials: true
};

mongoose.Promise = global.Promise;
const dbConfig = require("./config/database.config.js");

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

const User = require("./api/models/user_model");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


const routes = require("./api/routes");
app.use("/auth", routes);

app.get("/", function(req, res, next) {
  res.status(403).send("FORBIDDEN");
});

app.listen(port, function() {
  console.log(" REST API server Started on " + port);
});
