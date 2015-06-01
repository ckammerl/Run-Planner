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
  var startAddress = req.query.start || '611 Mission Street, San Francisco, CA';
  startAddress = startAddress.replace(' ', '+');
  var distance = req.query.distance || 3;
  var coordinates = {};
  var start = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + startAddress + '&key=';

  // check if there is an end address. If no end address, then need to make a route
  if (req.query.end) {
    var destAddress = req.query.end || null;
    destAddress = destAddress.replace(' ', '+');
    var end = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + destAddress + '&key=';
  }

  var getStart = function(callback) {
    return request(start, function(error, response, body) {
      if (!error && res.statusCode === 200) {
        console.log('line 55 coordinates start are', JSON.parse(body).results[0].geometry.location);
        callback(JSON.parse(body).results[0].geometry.location);
      } else {
        console.error(error);
      }
    })
  };

  getStart(function(startPoint) {
      coordinates.start = startPoint;
      if (destAddress) {
        request(end, function(error, response, body) {
          if (!error && res.statusCode === 200) {
            coordinates.end = JSON.parse(body).results[0].geometry.location;
            res.json(coordinates);
          } else {
            console.error(error);
          }
        });
      } else {
        // 0.01 change in longitude is 1.2 miles in san francisco
        var longConvert = function(longitude) { // converts distance up into how much to add to longitude
          return longitude * 0.00833333333;
        }
        // 0.01 change in lattitude is 0.6 miles in san francisco
        var latConvert = function(lattitude) {
          return lattitude * 0.01666666666;
        }

        coordinates.wayPoints = [];
        var routeDist = distance/4; 
        var upCoord = {'lat': coordinates.start.lat + longConvert(routeDist), 'lng':coordinates.start.lng};
        var rightCoord = {'lat': upCoord.lat, 'lng':upCoord.lng + latConvert(routeDist)};
        var downCoord = {'lat': rightCoord.lat - longConvert(routeDist), 'lng':rightCoord.lng};

        coordinates.wayPoints.push({'lat':coordinates.start.lat + distUp, 'lng':coordinates.start.lng});
        coordinates.wayPoints.push({'lat':coordinates.start.lat + distUp, 'lng':coordinates.start.lng + distLeft});

        res.json(coordinates);
      }
    })
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

