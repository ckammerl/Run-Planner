angular.module('runPlannerApp')

.controller('SearchController', function($scope, $state, Search, ResultHandler) {

  $scope.useSearchToGetResult = function() {
    Search.getZipCode($scope.search)
      .then(function(zipCode) {
        Search.getWeather(zipCode)
          .then(function(weather) {
            ResultHandler.setWeather(weather);
            console.log(weather);
            Search.getClothing($scope.search.gender, weather)
              .then(function(clothing) {
                ResultHandler.setClothing(clothing);
                $state.go('result');
              })
          })
      })
    Search.getRoute($scope.search)
      .then(function(route) {
        ResultHandler.setRoute(route);
      })
  }

});
