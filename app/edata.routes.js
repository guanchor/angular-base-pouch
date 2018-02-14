/*
 * Routes definitions for edata Client
 */
(function () {
  'use strict';

  angular.module('edata')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider, EGL_CONSTANTS) {
    // Define the default page of the application
    $routeProvider.otherwise({redirectTo: '/home'});

    // Home Page
    $routeProvider
      .when('/home', {
        templateUrl: './app/home/home.view.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .when('/users', {
        templateUrl: './app/users/users.view.html',
        controller: 'UsersController',
        controllerAs: 'usersCtrl'
      })
      .when('/user/:id?', {
        templateUrl: './app/user/user.view.html',
        controller: 'UserController',
        controllerAs: 'userCtrl'
      });
  }
})();
