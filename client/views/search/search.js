angular.module("runPlannerApp.search", [])

.controller("SearchController", function($scope, Search) {
  $scope.sendInput = function() {
    Search.sendInput($scope.search)
      .then(function(resultFromAPI) {
        $state.go("result", resultFromAPI);
      })
  }
});