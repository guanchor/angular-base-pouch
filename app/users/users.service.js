(function () {
  'use strict';

  angular
    .module('edata')
    .service('usersService', usersService);

  usersService.$inject = ['$q', '$http', 'md5', 'pouchdbService'];

  function usersService($q, $http, md5, pouchdbService) {
    this.fetch = function() {
      return pouchdbService.allDocs({ include_docs: true })
        .then(fetchComplete)
        .catch(fetchError)
      ;

      function fetchComplete(response) {
        return response.rows;
      }

      function fetchError(error) {
        console.error(error);
        return $q.reject( 'Error fetching the user list' );
      }
    }

    this.notExpired = function() {
      function map(doc) {
        if (new Date(doc.expireDate) > new Date()) {
          emit(doc);
        }
      }

      return pouchdbService.query(map, { include_docs: true })
        .then(fetchComplete)
        .catch(fetchError)
      ;

      function fetchComplete(response) {
        return response.rows;
      }

      function fetchError(error) {
        console.error(error);
        return $q.reject( 'Error fetching the user list' );
      }
    }

    this.remove = function(id, rev) {
      return pouchdbService.remove(id, rev)
        .then(removeComplete)
        .catch(removeError)
      ;

      function removeComplete(response) {
        return response.ok;
      }

      function removeError(error) {
        console.error(error);
        return $q.reject( 'Error removing user ' + id );
      }
    }

    this.sync = function(users) {
      return $http.post('https://sheltered-eyrie-45132.herokuapp.com/getToken', {
          'hash' : md5.createHash( JSON.stringify(users) )
        })
        .then(getTokenComplete)
        .catch(getTokenError)
      ;

      function getTokenComplete(response) {
        return $http({
            method: 'PUT',
            url: 'https://sheltered-eyrie-45132.herokuapp.com/user',
            headers: {
              'token': response.data
            },
            data: JSON.stringify(users)
          })
          .then(userPutComplete)
          .catch(userPutError)
        ;

        function userPutComplete(response) {
          return response.data;
        }

        function userPutError(error) {
          return $q.reject( 'Error putting users: ' + error.statusText );
        }
      }

      function getTokenError(error) {
        return $q.reject( 'Error sync users: ' + (error.statusText ? error.statusText : error) );
      }
    }
  }

})();
