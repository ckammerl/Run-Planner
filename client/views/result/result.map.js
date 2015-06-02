angular.module('runPlannerApp')

.controller('MapController', function($scope) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  $scope.options = {scrollwheel: false};
});
