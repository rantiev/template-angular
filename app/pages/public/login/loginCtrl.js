(function () {
	"use strict";

	let config = require('../../../appConfig.js');

	angular.module(config.appName).controller('login', [
		'loginService',
		'$scope', (
			loginService,
			$scope
		) => {

		$scope.submitForm = function () {

			loginService.login({
				email: $scope.inputEmail,
				password: $scope.inputPassword,
				remember: $scope.inputRememberMe
			}).then(
				function success(response){
					$state.go('main.private.projects');
					//toaster.pop("success", "", "You have logged in succesfully", 3000);
				},
				function error(reason){
					$state.go('main.public.login');
					//toaster.pop("error", "", "Please try to login again.", 3000);
				}
			);

		}

	}]);

})();