'use strict';

window.App.factory('Couchbase', function($resource) {
  var Couchbase = $resource('/api/cr/couch/:id', {}, {
  		delete: {method: 'DELETE', params: {id: '@id'}}
  });

  return Couchbase;
});


/*
services.factory('UserFactory', function ($resource) {
    return $resource('/ngdemo/web/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

*/