angular.module('runPlannerApp')

.controller('MapController', function($scope, $stateParams) {

  /** $stateParams format:
      startLat: null,
      startLng: null,
      upCoordLat: null,
      upCoordLng: null,
      rightCoordLat: null,
      rightCoordLng: null,
      downCoordLat: null,
      downCoordLng: null
  */

  $scope.lat = $stateParams.startLat || 37.7875176;
  $scope.lng = $stateParams.startLng || -122.3998683;

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 13 };
  $scope.options = {scrollwheel: false};

  $scope.polygons =
    [
      {
        id: 1,
        path: [
            {
                latitude: $stateParams.upCoordLat,
                longitude: $stateParams.upCoordLng
            },
            {
                latitude: $stateParams.rightCoordLat,
                longitude: $stateParams.rightCoordLng
            },
            {
                latitude: $stateParams.downCoordLat,
                longitude: $stateParams.downCoordLng
            }
        ],
        stroke: {
            color: '#000000',
            weight: 3
        },
        editable: true,
        draggable: true,
        geodesic: false,
        visible: true
      }
    ];
});

