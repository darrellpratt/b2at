'use strict';

window.App.factory('SlackMessage', function($resource) {
  var SlackMessage = $resource('/api/cr/slack/:id', { id:'@id' }, {
  		put: {
  			method: 'PUT',
  			params: {'id': '@id'}
  		},
  		get: {
  			method: 'GET',
  			params: {'id': '@id'}
  		}
  });

  return SlackMessage;
});
