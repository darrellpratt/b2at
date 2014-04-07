'use strict';

angular.module('app')
.controller('MainController', function ($location, $scope, $routeParams, $window, ChangeRequest) {

  $scope.bucket = [];

  $scope.search = function () {
    // Get CR ID ??
    // var cr;
    if ($scope.id === Number.NaN) {
      $scope.cr = {};
    } else {
      // cr = ChangeRequest.get({'id': $scope.id});
      // $scope.cr = cr;
      ChangeRequest.get({'id': $scope.id}, function(cr) {
        console.log(cr);
        $scope.cr = cr;
        // $scope.bucket.push(cr);
        // console.log('bucket: ' + $scope.bucket);
      });

    };

  };
});
