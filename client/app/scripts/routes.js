'use strict';

window.App.config(function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);

  $routeProvider.when('/cr/:crid', {
    controller: 'MainController',
    templateUrl: 'views/main.html'
  }).when('/cr/:id', {
    controller: 'MainController',
    templateUrl: '/views/main.html'
  }).when('/', {
    controller: 'MainController',
    templateUrl: 'views/main.html'
  }).otherwise({
    redirectTo: '/'
  });
});
