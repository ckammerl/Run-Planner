angular.module('runPlannerApp')

.controller('ClothingController', function($scope, $stateParams) {
  $scope.topCloth = {};
  $scope.bottomCloth = {};
  /** final data
  $scope.top.female = $stateParams.top.female;
  $scope.bottom.female = $stateParams.bottom.female;
  $scope.top.male = $stateParams.top.male;
  $scope.bottom.male = $stateParams.bottom.male;
  */

  // test data
  $scope.topCloth.female = 'shirt';
  $scope.bottomCloth.female = 'legging';
  $scope.topCloth.male = 'sweater';
  $scope.bottomCloth.male = 'shorts';
});
