/*
 * Routes definitions for edata Client
 */
(function () {
  'use strict';

  angular.module('edata')
    .config(configure);

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider, EGL_CONSTANTS) {
    // Define the default page of the application
    $routeProvider.otherwise({redirectTo: '/home'});

    // Home Page
    $routeProvider
      .when('/home', {
        templateUrl: './app/pages/home/home.view.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .when('/users', {
        templateUrl: './app/pages/users/users.view.html',
        controller: 'UsersController',
        controllerAs: 'usersCtrl'
      })
      .when('/user/:id?', {
        templateUrl: './app/pages/user/user.view.html',
        controller: 'UserController',
        controllerAs: 'userCtrl'
      });
  }
})();
