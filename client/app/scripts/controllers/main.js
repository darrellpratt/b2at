'use strict';


angular.module('app')
    .controller('MainController', function($timeout, $location, $routeParams,
        $resource, $scope, $window,
        ChangeRequest, SlackMessage,
        bucketStorage, $firebase,
        Couchbase) {

        // load our local storage
        $scope.bucket = bucketStorage.get();
        $scope.bucketList = [];
        // build track list from the object array if there
        _.each($scope.bucket, function(i) {
            $scope.bucketList.unshift(i.id);
        });


        // real time messages from firebase on favorite activity
        var ref = new Firebase("https://amber-fire-1059.firebaseio.com/");
        $scope.messages = $firebase(ref.limit(10)).$asArray();
        // console.log($firebase(ref).$asObject());
        console.dir($scope.messages.reverse());
        // var fireObject = $firebase(ref).$asObject();
        // fireObject.$bindTo($scope, "fires");
        // fireObject.$loaded().then(function() {
        //     // console.dir(fireObject);
        //     angular.forEach(fireObject, function(value, key) {
        //         // console.log(key, value);
        //     });
        // })
        // console.log($scope.messages);


        if ($routeParams.crid) {
            $scope.id = $routeParams.crid;
            console.log($scope.id);
            if ($scope.id === Number.NaN || $scope.id === '') {
                $scope.cr = {};
            } else {
                ChangeRequest.get({
                    'id': $scope.id
                }, function(cr) {
                    $scope.cr = cr;
                });

            };
        }

        $scope.search = function() {
            console.log('into search');
            if ($scope.id === Number.NaN || $scope.id === '') {
                $scope.cr = {};
            } else {
                ChangeRequest.get({
                    'id': $scope.id
                }, function(cr) {
                    $scope.cr = cr;
                    // $routeParams.crid = $scope.id;
                    $timeout(function() {
                        console.log($location.path());
                        $location.path('/cr/' + $scope.id);
                        console.log($scope);
                        console.log('scope: ' + $scope.id + ' route: ' + $routeParams.crid);
                    }, 4000);

                });
            };
        };

        $scope.save = function(id) {
            if (_.indexOf($scope.bucketList, $scope.cr.id) < 0) {
                $scope.bucket.unshift($scope.cr);
                $scope.bucketList.unshift(id);
                bucketStorage.remove();
                bucketStorage.put($scope.bucket);
                var msg = $scope.cr.title + " was favorited";
                $scope.messages.$add({
                    from: 'b2at bot',
                    body: msg
                });
            } else {

                var i = $scope.bucketList.indexOf(id);
                $scope.bucketList.splice(i, 1);
                $scope.bucket.splice(i, 1);
                bucketStorage.remove();
                bucketStorage.put($scope.bucket);

            };
            console.log($scope.bucketList);
            // console.log(_.sortBy($scope.bucket, 'id'));
            console.log($scope.bucket);
        };

        $scope.load = function(itemId) {
            // console.log($scope.itemId);
            var rawItem = $window.S(itemId);


            var rawId = rawItem.toInt();
            console.log(rawId);
            console.log(itemId);
            $scope.id = rawId;
            $window.document.body.scrollTop = 0;
            $location.path('/cr/' + $scope.id);

        };


        $scope.addMessage = function(e) {
            if (e.keyCode != 13) return;
            $scope.messages.$add({
                from: $scope.name,
                body: $scope.msg
            });
            $scope.msg = "";
        };

        $scope.slack = function(itemId) {
            console.log(itemId);
            $scope.id = itemId;
            SlackMessage.put({
                'id': itemId
            }, function(cr) {
                console.log('done');

            });
        };

        $scope.couch = function() {
            var itemId = $scope.id;
            console.log('couch delete on: ' + itemId);
            Couchbase.delete({
                'id': itemId
            }, function(item) {
                console.log('deleted item: ' + item);
                $scope.search();
            });

        };




    });
