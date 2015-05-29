var express = require('express');
var app = express();

// use Heroku's default port number when deployed
// use port 3000 on your local environment.
var port = process.env.PORT || 3000;

server.use(express.static(__dirname + '/client'));

app.listen(port);
console.log('Listening on port ' + port);

// API get request: api.openweathermap.org/data/2.5/weather?zip=94103,us
