angular.module('runPlannerApp')

.controller('SearchController', function($scope, $state, Search, $rootScope) {

  $scope.useSearchToGetResult = function() {
    Search.getZipCode($scope.search)
      .then(function(zipCode) {
        Search.getWeather(zipCode)
          .then(function(weather) {
            console.log('switching to result state with weather: ', weather);
            $state.go('result', weather);
            $rootScope.weather = weather;
            Search.getClothing($scope.search.gender, weather)
              .then(function(clothing) {
                console.log('switching to result state with clothing: ', clothing);
                $rootScope.clothing = clothing;
                $state.go('result', clothing);
              })
          })
      })
    Search.getRoute($scope.search)
      .then(function(route) {
        console.log('switching to result state with route: ', route);
        $rootScope.route = route;
        $state.go('result', route);
      })
  }

});
