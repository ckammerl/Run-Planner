angular.module("runPlannerApp.search", [])

.controller("searchController", function($scope) {
  var sendInput = function() {
    console.log('scope search', $scope.search);
  }
}); 