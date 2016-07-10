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

					$rootScope.currentUser = Auth.get().$promise.then(res => {
						$rootScope.currentUser = res.id;
						if (toState.blockLoggedIn) {
							$state.go('private.dashboard');
						} else {
							$rootScope.currentState = toState;
						}
					}, err => {
						$rootScope.currentUser = null;

						if (!toState.public) {
							$state.go('public.home');
						} else {
							$rootScope.currentState = toState;
						}
					});

				});

			}]);

})();