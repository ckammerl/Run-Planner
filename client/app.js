
// Declare app level module which depends on views, and components
angular.module("runPlannerApp", [
  "ui.router"
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("search", {
      url: "/",
      templateUrl: "partials/search.html"
    })

  // Reference: https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views
  $stateProvider
    .state("result", {
      url: "/result",
      templateUrl: "partials/result.html",
    })
});