angular.module("runPlannerApp")

  .controller("WeatherController", function($scope, $stateParams) {
    // parse $stateParams for final data
    //$scope.celsius = $stateParams.temp.C;
    //$scope.fahrenheit = $stateParams.temp.F;

    $scope.celsius = 20;
    $scope.fahrenheit = 60;
    $scope.humidity = 20; // parse $stateParams for final data
    $scope.wind = 50.9; // parse $stateParams for final data
  });
