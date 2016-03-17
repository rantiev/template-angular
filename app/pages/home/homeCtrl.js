(function () {
	"use strict";

	let config = require('../../appConfig.js');

	angular.module(config.appName).controller('home', ['$scope', ($scope) => {
		$scope.textHello = 'This is great hello text!';
	}]);

})();