angular.module('runPlannerApp')

.controller('ClothingController', function($scope, ResultHandler) {
  // displays gender specific clothing:
  $scope.topCloth = ResultHandler.clothing.top || 'shirt';
  $scope.bottomCloth = ResultHandler.clothing.bottom || 'shorts';
});
