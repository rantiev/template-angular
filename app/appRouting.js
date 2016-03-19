(function () {
    "use strict";

    let config = require('./appConfig.js');

    angular.module(config.appName)
        .config([
            '$httpProvider',
            '$urlRouterProvider',
            '$locationProvider',
            '$stateProvider'
        , function(
            $httpProvider,
            $urlRouterProvider,
            $locationProvider,
            $stateProvider
        ) {

            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    template: require('./pages/home/tpl/home.html'),
                    controller: 'home'
                })
                .state('home.page1', {
                    url: 'page1',
                    template: require('./pages/page1/tpl/page1.html'),
                    controller: 'page1'
                })
                .state('home.page2', {
                    url: 'page2',
                    template: require('./pages/page2/tpl/page2.html'),
                    controller: 'page2'
                });

        }]);

})();