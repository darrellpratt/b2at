'use strict';

angular.module('app')
.controller('MainController', function ($location, $scope, $routeParams, $window, ChangeRequest) {

  $scope.search = function () {
    // Get CR ID ??
    var cr;
    if ($scope.id === Number.NaN) {
      $scope.cr = {};
    } else {
      cr = ChangeRequest.get({'id': $scope.id});
      $scope.cr = cr;
      // $scope.post = Post.get({id: $routeParams.id}, success);
      console.log(cr);
      // console.log($location.url());
      // $location.hash($scope.id);
      // console.log($location.url());
      // console.log('id: ' + cr.id);
      // $window.localStorage.setItem('test', JSON.stringify(cr));
    }

  };
});
