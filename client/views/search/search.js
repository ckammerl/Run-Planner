angular.module('runPlannerApp')

.controller('SearchController', function($scope, $state, Search, ResultHandler) {

  $scope.useSearchToGetResult = function() {
    Search.getZipCode($scope.search)
      .then(function(zipCode) {
        Search.getWeather(zipCode)
          .then(function(weather) {
            console.log('switching to result state with weather: ', weather);
            ResultHandler.setWeather(weather);
            // console.log('ResultHandl er weather', ResultHandler.weather);
            Search.getClothing($scope.search.gender, weather)
              .then(function(clothing) {
                console.log('switching to result state with clothing: ', clothing);
                ResultHandler.setClothing(clothing);
                $state.go('result');
              })
          })
      })
    Search.getRoute($scope.search)
      .then(function(route) {
        console.log('switching to result state with route: ', route);
        ResultHandler.setRoute(route);
      })
  }

                 // console.log('ResultHandler clothing', ResultHandler.clothing);

                // weather, clothing and route now available => switch view:
                $state.go('result');
              })
          })
      })
    Search.getRoute($scope.search)
      .then(function(route) {
        console.log('switching to result state with route: ', route);
        ResultHandler.setRoute(route);
        // console.log('ResultHandler route', ResultHandler.route);
      })
  }
});
