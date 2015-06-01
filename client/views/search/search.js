angular.module("runPlannerApp")

.controller("SearchController", function($scope, Search, $state) {
  $scope.sendInput = function() {
    Search.sendInput($scope.search)
      .then(function(resultFromAPI) {
        $state.go("result", resultFromAPI);
      })
  }
});