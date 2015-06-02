angular.module("runPlannerApp")

.controller("SearchController", function($scope, Search, $state, $stateParams) {

  // on submission, 
    // send /api/weather a zip code
      // once that comes back 
        // send state the weather
        // send the weather to the clothing api
          // send the result state


  $scope.sendInput = function() {
    Search.sendInput($scope.search)
      .then(function(resultFromAPI) {
        console.log('result in search controller is:', resultFromAPI);
        $state.go("result", {tempC: 44, tempF: 60, humidity: 65, wind: 55.3});
      })
  }

});