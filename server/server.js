var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
// var weather = require('db.js');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use Heroku's default port number when deployed
// use port 3000 on your local environment.
var port = process.env.PORT || 3000;

// api requests
// get weather data
app.get('/test', function(req, res){
  var zipCode = req.body.data || 94704; // maybe change .data
  var result = {};
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + 'us&units=Imperial';
  request(url, function(error, response, body) {
    if (!error && res.statusCode === 200) {
      result.weather = JSON.parse(body).weather[0].main;
      result.temp = JSON.parse(body).main.temp;
      res.json(result); // send the
    } else {
      console.error(error);
    }
  });
});


app.post('/test', function(req, res){
  var zipCode = req.body.data || 94704; // maybe change .data
  var result = {};
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + 'us';
  request(url, function(error, response, body) {
    if (!error && res.statusCode === 200) {
      result.weather = JSON.parse(body).weather[0].main;
      result.temp = JSON.parse(body).main.temp;
      res.json(result); // send the
    } else {
      console.error(error);
    }
  });
});

app.listen(port);
console.log('Listening on port ' + port);
