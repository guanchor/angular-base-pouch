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
    ])
    .directive('topHeader', function() {
      return {
        restrict: 'E',
        templateUrl: './app/directives/top-header.html'
      };
    })
    .directive('sideMenu', function() {
      return {
        restrict: 'E',
        templateUrl: './app/directives/side-menu.html'
      };
    })
    .service('service', function(pouchDB) {
      var db = pouchDB('name');
    })
  ;
})();
