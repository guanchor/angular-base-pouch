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
  ]);
})();
