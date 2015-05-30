angular.module("runPlannerApp.services", [])

.factory("Search", function($http){

  var sendInput = function(searchInput) {

    return $http({
      method: 'GET',
      url: '/api/result',
      data: searchInput
    })
    .then(function(response) {
      return response.data;
    })
  };

  return {
    sendInput: sendInput
  };
})