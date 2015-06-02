angular.module("runPlannerApp")

  .controller("WeatherController", function($scope, $stateParams, $state) {
    // parse $stateParams for final data
    //$scope.celsius = $stateParams.temp.C;
    //$scope.fahrenheit = $stateParams.temp.F;

    console.log('state params in WeatherController: ', $state.params)

    $scope.celsius = $stateParams;
    $scope.fahrenheit = 60;
    $scope.humidity = 20; // parse $stateParams for final data
    $scope.wind = 50.9; // parse $stateParams for final data
  });
