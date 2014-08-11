/*global define*/
'use strict';

/**
 * Service that integrates to slack.
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
