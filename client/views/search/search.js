angular.module('runPlannerApp')

.controller('SearchController', function($scope, $state, Search) {

  $scope.sendInput = function() {
    /** final data
    Search.sendInput($scope.search)
       .then(function(resultFromAPI) {
         $state.go('result', resultFromAPI);
       })
  */

    // test data for weather
    // go to /result; params accessible to all child views
    $state.go('result', { celsius: 25, fahrenheit: 80, humidity: 55, wind: 73.5 });
  };
});

