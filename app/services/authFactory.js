(function () {
	"use strict";

	let config = require('../appConfig.js');

	angular.module(config.appName).service('Auth', [
		'$http',
		$resource => $resource(`${config.apiUrl}/user/:id/me`)
	]);

})();