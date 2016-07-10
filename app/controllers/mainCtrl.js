(function () {
	"use strict";

	let config = require('../appConfig.js');

	angular.module(config.appName).controller('Main', [
		'$http',
		'$rootScope',
		'$scope',
		'$state',
		function ($http, $rootScope, $scope, $state) {

			$scope.logOut = function() {
				$http({
					method: 'get',
					url: `${config.apiUrl}/logout`,
					withCredentials: true
				}).then(function (res) {
					$rootScope.currentUser = null;
					$state.go('public.home');
				}, function (err) {
					console.error(err);
				});
			};
		}
	]);

})();