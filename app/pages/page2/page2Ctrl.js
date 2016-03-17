(function () {
	"use strict";

	let config = require('../../appConfig.js');

	angular.module(config.appName).controller('page2', ['$scope', ($scope) => {
		$scope.title = 'This is page 2';
	}]);

})();