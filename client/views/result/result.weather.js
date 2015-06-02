angular.module('runPlannerApp')

  .controller('WeatherController', function($scope, $stateParams) {
    //final version
    $scope.celsius = $stateParams.celsius;
    $scope.fahrenheit = $stateParams.fahrenheit;
    $scope.humidity = $stateParams.humidity;
    $scope.wind = $stateParams.wind;
  });
