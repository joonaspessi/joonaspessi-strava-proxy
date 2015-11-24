var express = require("express");
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var path = require("path");
var _ = require("lodash");
var router = express.Router();

var stravaAccessToken = process.env["STRAVA_ACCESS_TOKEN"];


function encodeQueryParameters(parameters) {
    var query = _.map(parameters, function(value, key) {
        return key + "=" + value;
    }).join("&");

    return "?" + query;
}

function getResource(url) {
    return request(url)
        .then(res => JSON.parse(res.body));
}

function getWorkouts() {
    var resource = "https://www.strava.com/api/v3/activities";

    var query = {
        "access_token": stravaAccessToken,
        "page": 1,
        "per_page": 10
    };

    var url = resource + encodeQueryParameters(query);
    return getResource(url);
}

function getAthlete() {
    var resource = "https://www.strava.com/api/v3/athletes/6565991/stats";

    var query = {
        "access_token": stravaAccessToken,
    };

    var url = resource + encodeQueryParameters(query);

    return getResource(url);
}

router.get("/workouts", function(req, res) {
    getWorkouts()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});

router.get("/athlete", function(req, res) {
    getAthlete()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
