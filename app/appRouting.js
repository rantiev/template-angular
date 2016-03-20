(function () {
    "use strict";

    let config = require('./appConfig.js');

    angular.module(config.appName)
        .config([
            '$httpProvider',
            '$urlRouterProvider',
            '$locationProvider',
            '$stateProvider',
            (
                $httpProvider,
                $urlRouterProvider,
                $locationProvider,
                $stateProvider
            ) => {

            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('public', {
                    abstract:true,
                    template: require('./pages/public/public.html'),
                    public: true
                })
                .state('public.home', {
                    url: '/',
                    template: require('./pages/public/home/tpl/home.html'),
                    controller: 'home',
                    public: true
                })
                .state('public.login', {
                    url: '/login',
                    template: require('./pages/public/login/tpl/login.html'),
                    controller: 'login',
                    public: true,
                    blockLoggedIn: true
                })
                .state('public.registration', {
                    url: '/registration',
                    template: require('./pages/public/registration/tpl/registration.html'),
                    controller: 'registration',
                    public: true,
                    blockLoggedIn: true
                })
                .state('private', {
                    abstract:true,
                    template: require('./pages/private/private.html')
                })
                .state('private.dashboard', {
                    url: '/dashboard',
                    template: require('./pages/private/dashboard/tpl/dashboard.html'),
                    controller: 'dashboard'
                })
                .state('private.profile', {
                    url: '/profile',
                    template: require('./pages/private/profile/tpl/profile.html'),
                    controller: 'profile'
                });

        }]);

})();