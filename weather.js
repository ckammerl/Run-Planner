var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// connect to mongo database named runplanner
mongoose.connect('mongodb://localhost/runplanner');


// weather schema
var weatherSchema = new Schema({
  temp30: {
    top: String,
    bottom: String
  },
  temp40: {
    top: String,
    bottom: String
  },
  temp50: {
    top: String,
    bottom: String
  },
  temp60: {
    top: String,
    bottom: String
  },
  temp70: {
    top: String,
    bottom: String
  },
  temp80: {
    top: String,
    bottom: String
  }
});

// weather model
var Weather = mongoose.model('Weather', weatherSchema);


module.exports = Weather;