'use strict';

window.App.factory('SlackMessage', function($resource) {
  var SlackMessage = $resource('/api/cr/slack/:id', { id:'@id' });
  return SlackMessage;
});
