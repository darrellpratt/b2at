'use strict';

angular.module('app')
  .controller('MainController', function ($scope, $routeParams, ChangeRequest) {

    $scope.search = function () {
      // Get CR ID ??
      var cr;
      cr = ChangeRequest.get({'id': $scope.id});
      console.log(cr);
      $scope.cr = cr;
      // $scope.post = Post.get({id: $routeParams.id}, success);
      console.log(cr);
    };
  });
