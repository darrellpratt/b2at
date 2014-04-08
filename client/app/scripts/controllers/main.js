'use strict';


angular.module('app')
.controller('MainController', function ($location, $scope, $window, ChangeRequest, bucketStorage, $firebase) {

  // load our local storage
  $scope.bucket = bucketStorage.get();
  $scope.bucketList = [];
  // build track list from the object array if there
  _.each($scope.bucket, function(i) {
    $scope.bucketList.unshift(i.id);
  })

  var ref = new Firebase("https://amber-fire-1059.firebaseio.com/");
  ref.endAt().limit(5);
  $scope.messages = $firebase(ref);
  console.log($scope.messages);


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
      var msg = $scope.cr.title + " was favorited";
      $scope.messages.$add({from: 'b2at bot', body: msg});
    } else {

      var i = $scope.bucketList.indexOf(id);
      $scope.bucketList.splice(i, 1);
      $scope.bucket.splice(i, 1);
      bucketStorage.remove();
      bucketStorage.put($scope.bucket);

    };
    console.log($scope.bucketList);
    console.log($scope.bucket);
  };

  $scope.load = function(itemId) {
    // console.log($scope.itemId);
    console.log(itemId);
    $scope.id = itemId;
    ChangeRequest.get({'id': itemId}, function(cr) {
        $scope.cr = cr;
      });
  }

  $scope.addMessage = function(e) {  
    if (e.keyCode != 13) return;
    $scope.messages.$add({from: $scope.name, body: $scope.msg});
    $scope.msg = "";
  };


});
