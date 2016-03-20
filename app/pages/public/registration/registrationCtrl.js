(function () {
	"use strict";

	let config = require('../../../appConfig.js');

	angular.module(config.appName).controller('registration', [
		'User',
		'$scope', (userService,
				   $scope) => {

			$scope.submitForm = function () {

				if ($scope.inputPassword !== $scope.inputConfirmPassword) {
					return;
				}

				let user = new User();

				user.save({
					email: $scope.inputEmail,
					fname: $scope.inputFirstName,
					lname: $scope.inputLastName,
					password: $scope.inputPassword
				}).then((err, res) => {
					if (err) {
						console.error(err);
						return;
					}

					$state.go('private.dashboard');
				});

			}

		}]);

})();