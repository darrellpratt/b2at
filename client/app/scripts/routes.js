'use strict';

App.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    controller: 'MainController',
    templateUrl: 'views/main.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
