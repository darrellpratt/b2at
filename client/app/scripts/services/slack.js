/*global define*/
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage.
 */
 window.App.factory('slack', function () {

		return {
			
			push: function (item) {
				var url = 'https://nielsen-buy.slack.com/services/hooks/incoming-webhook?token=f9DiEn10DkL2DAITVYFow68J';
				request.post(url, {form:{payload: JSON.stringify(item)}}, function() {
					console.log('done');
      	});
			},

		};
	});
