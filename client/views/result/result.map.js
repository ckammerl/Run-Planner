angular.module('runPlannerApp')

.controller('MapController', function($scope, ResultHandler) {

  $scope.lat = ResultHandler.route.startLat || 37.7875176;
  $scope.lng = ResultHandler.route.startLng || -122.3998683;

  $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng }, zoom: 14 };
  $scope.options = {scrollwheel: false};

  $scope.upCoord = {lat:ResultHandler.route.upCoordLat,lng:ResultHandler.route.upCoordLng}
  $scope.rightCoord = {lat: ResultHandler.route.rightCoordLat,lng: ResultHandler.route.rightCoordLng}
  $scope.downCoord = {lat: ResultHandler.route.downCoordLat,lng: ResultHandler.route.downCoordLng}
            
//   $scope.polygons =
//     [
//       {
//         id: 1,
//         path: [
//             {
//                 latitude: ResultHandler.route.upCoordLat || 37.7937675999975,
//                 longitude: ResultHandler.route.upCoordLng || -122.3998683
//             },
//             {
//                 latitude: ResultHandler.route.rightCoordLat || 37.7937675999975,
//                 longitude: ResultHandler.route.rightCoordLng || -122.387368300005
//             },
//             {
//                 latitude: ResultHandler.route.downCoordLat || 37.7875176,
//                 longitude: ResultHandler.route.downCoordLng || -122.387368300005
//             }
//         ],
//         stroke: {
//             color: '#161669',
//             weight: 3
//         },
//         editable: true,
//         draggable: true,
//         geodesic: false,
//         visible: true
//       }
//     ];
// });

$timeout(function(){
            directionsDisplay = new google.maps.DirectionsRenderer();

            //this is where we pass our the map object to the directionsDisplay.setMap method
            directionsDisplay.setMap($scope.map);
            google.maps.event.trigger($scope.map, 'resize');
        },0);
        }
        $scope.findPath=function () {

            //using the direction service of google map api
            $scope.directionsService = new google.maps.DirectionsService();

            var request = {
                origin: $scope.lat, $scope.lng,
                destination: $scope.lat,$scope.lng,
                waypoints:
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
                },
                    travelMode: google.maps.DirectionsTravelMode.WALKING
                }
            //call the route method on google map api direction service with the request
            //which returns a response which can be directly provided to
            //directiondisplay object to display the route returned on the map
            $scope.directionsService.route(request, function(response, status) {

                if (status == google.maps.DirectionsStatus.OK) {
                    console.log(response);
                    directionsDisplay.setDirections(response);
                    console.log(response.routes.length);
                    $scope.trip.distance= response.routes[0].legs[0].distance.value / 1000;

                }


            });



        }



