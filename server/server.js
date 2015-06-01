var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var utils = require('./utils.js');
var db = require('./db.js');

app.use(express.static(__dirname + "/../client"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use Heroku's default port number when deployed
// use port 3000 on your local environment.
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

// API REQUESTS
// get weather data
app.get('/api/weather', function(req, res){
  var zipCode = req.query.startLocation.zipCode || 94704; // maybe change .data
  var result = {};
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + 'us&units=Imperial';
  request(url, function(error, response, body) {
    if (!error && res.statusCode === 200) {
      result.temp = {'F': Math.round(JSON.parse(body).main.temp), 'C': Math.round(utils.convertToMetric(JSON.parse(body).main.temp))};
      result.humidity = JSON.parse(body).main.humidity;
      result.wind = JSON.parse(body).wind;
      result.weather = JSON.parse(body).weather[0].main;
      res.json(result);
    } else {
      console.error(error);
    }
  });
});


// get geocode latlong data
app.get('/api/route', function(req, res) {
  var address = req.body.startLocation.address || '611 Mission St, San Francisco, CA 94105';
  address = address.replace(' ', '+');
  var coordinates = {};
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=';
  request(url, function(error, response, body) {
    if (!error && res.statusCode === 200) {
      coordinates = JSON.parse(body).results[0].geometry.location;
      res.json(coordinates);
    } else {
      console.error(error);
    }
  });
});
// get clothes images
app.get('/api/clothing', function(req, res){
  var weather = req.query.weather;
  var gender = req.query.gender.toLowerCase();
  var tempScore = utils.calcTempScore(weather);
  db.findOne({gender: gender}, function(err, clothes) {
    if (err) {
      return console.error(err);
    }
    var clothesKey = utils.getTempString(tempScore);
    console.log(clothesKey);
    res.json(clothes[clothesKey]);
  });
});

app.listen(port);
console.log('Listening on port ' + port);

