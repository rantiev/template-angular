(function () {
	"use strict";

	let config = require('./appConfig.js');

	angular.module(config.appName)
		.run([
			'Auth',
			'$rootScope',
			'$state',
			'$timeout', (
				Auth,
				$rootScope,
				$state,
				$timeout
			) => {

				$rootScope.$on("$stateChangeStart", function (
					event,
					toState,
					toParams,
					fromState,
					fromParams
				) {

					Auth.get().$promise.then(res => {
						$rootScope.currentUser = response.data;

						if (toState.blockLoggedIn) {
							$state.go('private.dashboard');
						}

						$rootScope.currentState = toState;
					}, err => {
						if (!toState.public) {
							$state.go('public.home');
						}
					});

				});

			}]);

})();