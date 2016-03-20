(function () {
	"use strict";

	let config = require('../appConfig.js');

	angular.module(config.appName).service('User', [
		'$resource',
		$resource => $resource(`${config.apiUrl}/user/:id`)
	]);

})();