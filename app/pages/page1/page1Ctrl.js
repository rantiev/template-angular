(function () {
	"use strict";

	let config = require('../../appConfig.js');

	angular.module(config.appName).controller('page1', ['$scope', ($scope) => {
		$scope.title = 'This is page 1';
	}]);

})();