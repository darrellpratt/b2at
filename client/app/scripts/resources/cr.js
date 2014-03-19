'use strict';

angular.factory('CR', function($resource) {
  return $resource('/api/users/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
