(function () {
	"use strict";

	let config = require('../../appConfig.js');

	angular.module(config.appName).directive('mainNav', [
		'$rootScope',
		'$state',
		function ($rootScope, $state) {
			return {
				restrict: 'A',
				template: require('./tpl/mainNav.html'),
				controller: function ($scope) {
					var links = [
						{
							title: 'Home',
							path: 'public.home'
						},
						{
							title: 'Dashboard',
							path: 'private.dashboard',
							private: true
						},
						{
							title: 'Registration',
							path: 'public.registration',
							hideWhenLoggedIn: true
						},
						{
							title: 'Login',
							path: 'public.login',
							hideWhenLoggedIn: true
						},
						{
							title: 'Logout',
							action: 'logOut',
							private: true
						}
					];

					function getMenuItems () {
						$scope.links = [];

						links.forEach(function (link) {
							if(!link.hideWhenLoggedIn && $rootScope.currentUser) {
								$scope.links.push(link);
							} else if(!link.private && !$rootScope.currentUser) {
								$scope.links.push(link);
							}
						});

					}

					$scope.action = function(link) {
						if (link.path) {
							$state.go(link.path);
						} else {
							$scope[link.action]();
						}

						return false;
					};

					getMenuItems();
					$rootScope.$watch('currentUser', getMenuItems);

				}
			}
		}
	]);

})();