angular.module('runPlannerApp')

  .controller('WeatherController', function($scope, $stateParams) {
    /** final data
    $scope.celsius = $stateParams.temp.C;
    $scope.fahrenheit = $stateParams.temp.F;
    $scope.humidity = $stateParams.humidity;
    $scope.wind = $stateParams.wind;
  */

    // test data
    $scope.celsius = 20;
    $scope.fahrenheit = 60;
    $scope.humidity = 20;
    $scope.wind = 50.9;
  });
