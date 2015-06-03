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

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 14 };
  $scope.options = {scrollwheel: false};

  $scope.polygons =
    [
      {
        id: 1,
        path: [
            {
                latitude: $stateParams.upCoordLat || 37.7937675999975,
                longitude: $stateParams.upCoordLng || -122.3998683
            },
            {
                latitude: $stateParams.rightCoordLat || 37.7937675999975,
                longitude: $stateParams.rightCoordLng || -122.387368300005
            },
            {
                latitude: $stateParams.downCoordLat || 37.7875176,
                longitude: $stateParams.downCoordLng || -122.387368300005
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

