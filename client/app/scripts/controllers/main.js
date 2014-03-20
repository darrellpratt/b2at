'use strict';

angular.module('app')
  .controller('MainController', function ($scope, $routeParams, ChangeRequest) {

    $scope.search = function () {
      // Get CR ID ??
      var cr;
      if ($scope.id === Number.NaN) {
        $scope.cr = {};
      } else {
        cr = ChangeRequest.get({'id': $scope.id});
        console.log(cr);
        $scope.cr = cr;
        // $scope.post = Post.get({id: $routeParams.id}, success);
        console.log(cr);
      }

    };
  });
