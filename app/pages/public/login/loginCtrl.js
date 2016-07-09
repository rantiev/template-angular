(function () {
	"use strict";

	let config = require('../../../appConfig.js');

	angular.module(config.appName).controller('login', [
		'Auth',
		'$state',
		'$scope', (Auth,
				   $state,
				   $scope) => {

			$scope.submitForm = function () {

				let auth = new Auth();

				auth.$save({
					email: $scope.inputEmail,
					password: $scope.inputPassword,
					remember: $scope.inputRememberMe
				}).then(res => {
					$state.go('private.dashboard');
				}, err => {
					console.error(err);
				});

			}

		}]);

})();