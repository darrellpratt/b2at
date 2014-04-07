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
        // console.log(cr);
        $scope.cr = cr;
        // $scope.bucket.push(cr);
        // console.log('bucket: ' + $scope.bucket);
      });

    };

  };

  $scope.save = function (id) {
    console.log($scope.cr);
    if (_.indexOf($scope.bucket, $scope.cr)) {
      $scope.bucket.unshift($scope.cr);
    }
    // console.log($scope.bucket);
  };

  $scope.load = function(itemId) {
    console.log($scope.itemId);
    console.log(itemId);
    ChangeRequest.get({'id': itemId}, function(cr) {
        // console.log(cr);
        $scope.cr = cr;
        // $scope.bucket.push(cr);
        // console.log('bucket: ' + $scope.bucket);
      });
  }
});
