/*
 * Routes definitions for edata Client
 */
(function () {
    'use strict';

    angular.module('edata')
            .config(configure);

    configure.$inject = ['$routeProvider'];

    function configure($routeProvider, EGL_CONSTANTS) {
        //Define the default page of the application
        $routeProvider.otherwise({redirectTo: '/start'});
        //Start Page
        $routeProvider.when('/start', {
            templateUrl: './app/start.view.html',
            controller: 'StartController',
            controllerAs: 'startCtrl'
        });
    }
})();
