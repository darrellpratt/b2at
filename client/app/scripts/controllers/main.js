'use strict';


angular.module('app')
.controller('MainController', function ($location, $scope, $window, ChangeRequest, bucketStorage) {

  $scope.bucket = bucketStorage.get();
  $scope.bucketList = bucketStorage.get();


  $scope.run = function() {
    console.log("init");

  }

  $scope.search = function () {
    if ($scope.id === Number.NaN) {
      $scope.cr = {};
    } else {
      ChangeRequest.get({'id': $scope.id}, function(cr) {
        $scope.cr = cr;
      });
    };
  };

  $scope.save = function (id) {
    if (_.indexOf($scope.bucketList, $scope.cr.id) < 0) {
      $scope.bucket.unshift($scope.cr);
      $scope.bucketList.unshift(id);
      // $window.localStorage.setItem('bucket', $scope.bucket);
      bucketStorage.remove();
      bucketStorage.put($scope.bucket);
    }
  };

  $scope.load = function(itemId) {
    // console.log($scope.itemId);
    console.log(itemId);
    $scope.id = itemId;
    ChangeRequest.get({'id': itemId}, function(cr) {
        $scope.cr = cr;
      });
  }
});
