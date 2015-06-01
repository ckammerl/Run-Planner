var db = require('./db.js')


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
  }
}
// result.temp = {'F': Math.round(JSON.parse(body).main.temp), 'C': Math.round(utils.convertToMetric(JSON.parse(body).main.temp))};
//       result.humidity = JSON.parse(body).main.humidity;
//       result.wind = JSON.parse(body).wind;
//       result.weather = JSON.parse(body).weather[0].main;