var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var utils = require('./utils.js');
// var weather = require('db.js');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use Heroku's default port number when deployed
// use port 3000 on your local environment.
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

// api requests
// get weather data
app.get('/api/result', function(req, res) {
  console.log(req.query);
  var zipCode = req.body.startLocation.zipCode || 94704; // maybe change .data
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
  var startAddress = req.body.startLocation || '611 Mission St, San Francisco, CA 94105';
  startAddress = startAddress.replace(' ', '+');
  // check if there is an end address. If no end address, then need to make a route
  if (req.body.destinationLocation) {
    var destAddress = req.body.destinationLocation || null;
    destAddress = destAddress.replace(' ', '+');
  }
  var distance = req.body.distance || 3;
  var coordinates = {};
  var start = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + startAddress + '&key=';
  var end = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + destAddress + '&key=';
  var getStart = function(callback) {
    return request(start, function(error, response, body) {
      if (!error && res.statusCode === 200) {
        console.log('line 55 coordinates start are', JSON.parse(body).results[0].geometry.location);
        callback(JSON.parse(body).results[0].geometry.location);
      } else {
        console.error(error);
      }
    })
  }
  getStart(function(startPoint) {
      coordinates.start = startPoint;
      console.log('line 63 the startpoint is ', coordinates.start);
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
        coordinates.wayPoints = [];
        // 0.01 in longitude is 1.2 miles in san francisco
        var longConvert = function(longitude) { // converts distance up into how much to add to longitude
          return longitude * 0.00833333333;
        }
        // 0.01 in lattitude is 0.6 miles in san francisco
        var latConvert = function(lattitude) {
          return lattitude * 0.01666666666;
        }
        // distance is 3
        // need to determine a distUp, and distDown that will route back to start with a distance of about 3
        // create a route in a triangle shape with each side whose ratios are 3:4:5
        var trianglePerim = distance/12; 
        var distUp = longConvert(3 * trianglePerim);
        var distLeft = latConvert(4 * trianglePerim);
        coordinates.wayPoints.push({'lat':coordinates.start.lat + distUp, 'lng':coordinates.start.lng});
        coordinates.wayPoints.push({'lat':coordinates.start.lat, 'lng':coordinates.start.lng + distLeft});
        console.log('waypoints are', coordinates.wayPoints);
        res.json(coordinates);
      }
    })
});

app.listen(port);
console.log('Listening on port ' + port);

