angular.module("runPlannerApp.services", [])

.factory("Search", function($http){

  var sendInput = function(searchInput) {

    // var data = JSON.stringify(searchInput);
    // console.log('the input that is being sent to api', data);
    return $http({
      method: 'POST',
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