angular.module('runPlannerApp')

.controller('ClothingController', function($scope, ResultHandler) {
  // currently no gender info available, only uni top and bottom
  $scope.topCloth = ResultHandler.clothing.top || 'shirt';
  $scope.bottomCloth = ResultHandler.clothing.bottom || 'shorts';
});
