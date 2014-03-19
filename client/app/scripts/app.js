'use strict';

// angular.module('app', [
//   'ngCookies',
//   'ngResource',
//   'ngSanitize',
//   'ngRoute'
// ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/main.html',
//         controller: 'MainController'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });

window.App = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies']);
