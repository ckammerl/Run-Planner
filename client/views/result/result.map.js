angular.module('runPlannerApp')

.controller('MapController', function($scope, ResultHandler) {

  $scope.lat = ResultHandler.route.startLat || 37.7875176;
  $scope.lng = ResultHandler.route.startLng || -122.3998683;

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 14 };
  $scope.options = {scrollwheel: false};

  $scope.polygons =
    [
      {
        id: 1,
        path: [
            {
                latitude: ResultHandler.route.upCoordLat || 37.7937675999975,
                longitude: ResultHandler.route.upCoordLng || -122.3998683
            },
            {
                latitude: ResultHandler.route.rightCoordLat || 37.7937675999975,
                longitude: ResultHandler.route.rightCoordLng || -122.387368300005
            },
            {
                latitude: ResultHandler.route.downCoordLat || 37.7875176,
                longitude: ResultHandler.route.downCoordLng || -122.387368300005
            }
        ],
        stroke: {
            color: '#161669',
            weight: 3
        },
        editable: true,
        draggable: true,
        geodesic: false,
        visible: true
      }
    ];
});

