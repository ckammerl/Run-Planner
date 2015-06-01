angular.module("runPlannerApp")

.factory("Search", function($http) {

  var sendInput = function(searchInput) {

    // var data = JSON.stringify(searchInput);
    // console.log('the input that is being sent to api', data);
    return $http({
      method: 'GET',
      url: '/api/result',
      params: searchInput
    })
    .then(function(response) {
      return response.data;
    })
  };

  return {
    sendInput: sendInput
  };
})