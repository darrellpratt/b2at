/*global define*/
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage.
 */
 window.App.factory('bucketStorage', function () {
		var STORAGE_ID = 'b2at';

		return {
			get: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			put: function (bucket) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(bucket));
			},

      remove: function () {
        localStorage.removeItem(STORAGE_ID);
      }
		};
	});
