var express = require('express');
var server = express();

// use Heroku's default port number when deployed
// use port 3000 on your local environment.
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));

server.listen(port);
console.log('Listening on port ' + port);
