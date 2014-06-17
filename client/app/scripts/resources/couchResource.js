'use strict';

window.App.factory('Couchbase', function($resource) {
  var Couchbase = $resource('/api/cr/couch/:id', { id:'@id' });
  return Couchbase;
});
