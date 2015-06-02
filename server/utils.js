var db = require('./db.js')
var request = require('request');



module.exports = {
  convertToMetric: function(temp) {
    return (temp  - 32) * 5 / 9;
  },
  calcTempScore: function(weatherObject) {
    var tempScore = weatherObject.temp.F;
    // console.log(weatherObject.wind.speed)
    tempScore -= weatherObject.wind.speed / 3;
    if (weatherObject.weather.toLowerCase().indexOf('cloud') !== -1) {
      tempScore -= 5;
    } else if (weatherObject.weather.toLowerCase().indexOf('rain') !== -1) {
      tempScore -= 10;
    } else if (weatherObject.weather.toLowerCase().indexOf('snow') !== -1) {
      tempScore -= 20;
    } else if (weatherObject.weather.toLowerCase().indexOf('mist') !== -1) {
      tempScore -= 5;
    } else if (weatherObject.weather.toLowerCase().indexOf('thunder') !== -1) {
      tempScore -= 10;
    }
    return Math.round(tempScore);
  },
  getTempString: function(tempScore) {
    var tempString = 'temp';
    if (tempScore < 30) {
      tempString += 30;
    } else if (tempScore > 60) {
      tempString += 60;
    } else {
      tempString += Math.round(tempScore / 10) * 10;
    }
    return tempString;
  },

  // 0.01 change in longitude is 1.2 miles in san francisco(only works in san francisco)
  longConvert: function(longitude) { // converts distance up into how much to add to longitude
    return longitude * 0.00833333333;
  },
  // 0.01 change in lattitude is 0.6 miles in san francisco(only works in san francisco)
  latConvert: function(lattitude) {
    return lattitude * 0.01666666666;
  }
}
// result.temp = {'F': Math.round(JSON.parse(body).main.temp), 'C': Math.round(utils.convertToMetric(JSON.parse(body).main.temp))};
//       result.humidity = JSON.parse(body).main.humidity;
//       result.wind = JSON.parse(body).wind;
//       result.weather = JSON.parse(body).weather[0].main;