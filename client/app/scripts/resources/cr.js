'use strict';

window.App.factory('ChangeRequest', function($resource) {
  var ChangeRequest = $resource('/api/cr/:id', { id:'@id' });
  return ChangeRequest;
});
