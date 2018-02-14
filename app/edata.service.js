(function () {
  'use strict';

  angular
    .module('edata')
    .service('pouchdbService', pouchdbService);

  pouchdbService.$inject = ['$q'];

  function pouchdbService($q) {
    var database;
    var changeListener;

    initialization();

    function initialization() {
      database = new PouchDB('edata_db');
    }

    this.allDocs = function(options) {
      return database.allDocs(options ? options : {});
    }

    this.destroy = function() {
      database.destroy();
    }

    this.get = function(documentId) {
      return database.get(documentId);
    }

    this.query = function(map, options) {
      return database.query(map, options);
    }

    this.remove = function(documentId, documentRevision) {
      return database.remove(documentId, documentRevision);
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
  }

})();
