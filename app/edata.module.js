/*
 * Main module for edata Client
 * Dependencies:
 * - pouchdb --> Our local database
 * - ngRoute --> Allows us to use routes on Angular
 */
(function () {
  'use strict';

  angular.module('edata', [
    'pouchdb',
    'ngRoute'
  ])
  .directive('sideMenu', function() {
    return {
      restrict: 'E',
      templateUrl: './app/directives/side-menu.html'
    };
  })
  ;
})();
