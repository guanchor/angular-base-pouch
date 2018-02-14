/*
 * Main module for edata Client
 * Dependencies:
 * - pouchdb --> Our local database
 * - ngRoute --> Allows us to use routes on Angular
 */
(function () {
  'use strict';

  angular
    .module('edata', [
      'pouchdb',
      'ngRoute',
      'angularjs-datetime-picker',
      'angular-md5'
    ])
    .directive('topHeader', function() {
      return {
        restrict: 'E',
        templateUrl: './app/top-header/top-header.view.html'
      };
    })
    .directive('sideMenu', function() {
      return {
        restrict: 'E',
        templateUrl: './app/side-menu/side-menu.view.html'
      };
    })
  ;

})();
