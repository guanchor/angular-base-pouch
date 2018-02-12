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
      'angularjs-datetime-picker'
    ])
    .directive('topHeader', function() {
      return {
        restrict: 'E',
        templateUrl: './app/directives/top-header.view.html'
      };
    })
    .directive('sideMenu', function() {
      return {
        restrict: 'E',
        templateUrl: './app/directives/side-menu.view.html'
      };
    })
    .service('pouchdbService', pouchdbService)
  ;

  function pouchdbService($q) {
    var database;
    var changeListener;

    initialization();

    function initialization() {
      database = new PouchDB('edata_db');
    }

    this.startListening = function() {
      changeListener = database.changes({
        live: true,
        include_docs: true
      }).on("change", function(change) {
        if(!change.deleted) {
          $rootScope.$broadcast("$pouchDB:change", change);
        } else {
          $rootScope.$broadcast("$pouchDB:delete", change);
        }
      });
    }

    this.stopListening = function() {
      changeListener.cancel();
    }

    this.sync = function(remoteDatabase) {
      database.sync(remoteDatabase, {live: true, retry: true});
    }

    this.save = function(jsonDocument) {
      var deferred = $q.defer();
      if(!jsonDocument._id) {
        database.post(jsonDocument).then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
      } else {
        database.put(jsonDocument).then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
      }
      return deferred.promise;
    }

    this.delete = function(documentId, documentRevision) {
      return database.remove(documentId, documentRevision);
    }

    this.get = function(documentId) {
      return database.get(documentId);
    }

    this.destroy = function() {
      database.destroy();
    }
  }
})();
