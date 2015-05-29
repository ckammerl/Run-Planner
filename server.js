var express = require('express');

var server = express();

// use Heroku's default port number when deployed
// use port 3468 on your local environment.
var port = process.env.PORT || 3468;

server.listen(port);
console.log('Listening on port ' + port);