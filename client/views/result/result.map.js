angular.module('runPlannerApp')

.controller('MapController', function($scope, $sce, ResultHandler) {

  $scope.lat = ResultHandler.route.startLat || 37.7875176;
  $scope.lng = ResultHandler.route.startLng || -122.3998;

  $scope.upCoord = {lat:ResultHandler.route.upCoordLat,lng:ResultHandler.route.upCoordLng};
  $scope.rightCoord = {lat: ResultHandler.route.rightCoordLat,lng: ResultHandler.route.rightCoordLng};
  $scope.downCoord = {lat: ResultHandler.route.downCoordLat,lng: ResultHandler.route.downCoordLng};
  // generates google map with directions from given coordinates
  $scope.directionsSrc = "https://www.google.com/maps/embed/v1/directions?origin=" + $scope.lat + "," + $scope.lng + "&destination=" + $scope.lat + "," + $scope.lng + "&waypoints=" + $scope.upCoord.lat + ',' + $scope.upCoord.lng + "|" + $scope.rightCoord.lat + "," + $scope.rightCoord.lng + "|" + $scope.downCoord.lat + "," + $scope.downCoord.lng + "&mode=walking&key=AIzaSyCBVw8evllNw1FaR2OXfFQvmJ-8jBpKWAI&zoom=14&center=" + $scope.lat + "," + $scope.lng;
  // sets google map html for result.map.js
  $scope.directionsHTML = '<iframe width="800" height="600" frameborder="0" style="border:0" src="' + $scope.directionsSrc + '"></iframe>';

  $scope.htmlSafe = function(data) {
    return $sce.trustAsHtml(data);
  }
})

.filter('toTrusted', function($sce) {
    return function(value) {
        return $sce.trustAsHtml(value);
    };
});


