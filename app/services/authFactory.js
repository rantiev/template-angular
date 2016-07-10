(function () {
	"use strict";

	let config = require('../appConfig.js');

	angular.module(config.appName).service('Auth', [
		'$resource',
		$resource => $resource(`${config.apiUrl}/me`, {}, {
			save: {
				method: 'post',
				withCredentials: true
			}
		})
	]);

})();