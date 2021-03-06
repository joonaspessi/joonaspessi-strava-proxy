"use strict";
var express = require("express");
var strava = require("./routes/strava.js");

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/v1/", strava);

let server = app.listen(3000, function() {
    let port = server.address().port;
    console.log("Strava proxy listening at port", port);
});
