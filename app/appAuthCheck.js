(function () {
	"use strict";

	let config = require('./appConfig.js');

	angular.module(config.appName)
		.run([
			'$rootScope',
			'$state',
			'$timeout',
			'$http', (
				$rootScope,
				$state,
				$timeout,
				$http
			) => {

				$rootScope.$on("$stateChangeStart", function (
					event,
					toState,
					toParams,
					fromState,
					fromParams
				) {

					$http({
						url: '/me',
						method: 'post'
					})
						.then(
						function success(response) {
							$rootScope.currentUser = response.data;

							if (toState.blockLoggedIn) {
								$state.go('private.dashboard');
								return;
							}

							$rootScope.currentState = toState;
						},
						function error(reason) {
							if (!toState.public) {
								$state.go('public.home');
							}
						}
					);

				});

			}]);

})();