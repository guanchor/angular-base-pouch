(function () {
  'use strict';

  angular
    .module('edata')
    .factory('userService', userService);

  userService.$inject = ['$q', 'pouchdbService'];

  function userService($q, pouchdbService) {
    var _errors = [],

      _rules = {
        expireDate: { 'required': null },
        firstName: { 'required': null, 'maxLength': 100 },
        lastName: { 'required': null, 'maxLength': 100 },
        status: { 'required': null },
      },

      _setError = function(field, rule, status) {
        if (!field) {
          return _errors['form'] = true;
        }
        if (!_errors[field]) {
          _errors[field] = [];
        }
        return _errors[field][rule] = status;
      },

      _validators = {
        required: function(value) {
          return value !== null && value !== "" && value !== [];
        },
        maxLength: function(value, length) {
          return (typeof value === 'string' || value instanceof String) && value.length <= length;
        }
      }
    ;

    // services return
    var service = {
      getErrors: getErrors,
      getUser: getUser,
      save: save,
      validateField: validateField
    };
    return service;
    //

    function getErrors() {
      return _errors;
    }

    function getUser(userId) {
      return pouchdbService.get(userId)
        .then(getUserComplete)
        .catch(getUserError)
      ;

      function getUserComplete(response) {
        return response;
      }

      function getUserError(error) {
        console.error(error);
        return $q.reject( 'Error retrieving user ' + userId );
      }
    }

    function save(data) {
      var doc = {};

      saveBind(data);
      try {
        saveValidation();
      }
      catch (e) {
        return $q.reject(e);
      }

      return pouchdbService.save(doc)
        .then(saveComplete)
        .catch(saveError)
      ;

      function saveBind(data) {
        doc._id = data._id;
        doc._rev = data._rev;
        doc.expireDate = data.expireDate;
        doc.firstName = data.firstName;
        doc.lastName = data.lastName;
        doc.status = data.status;
      }

      function saveValidation() {
        var valid = true;

        Object.keys( _rules ).forEach( field => {
          if (!validateField(field, doc[field]) && valid) {
            valid = false;
          }
        });

        if (!valid) {
          throw 'Validation Error';
        }
        return valid;
      }

      function saveComplete(response) {
        return response.ok;
      }

      function saveError(error) {
        console.error(error);
        return $q.reject( 'Error saving user: ' + error.message );
      }
    }

    function validateField(field, value) {
      let fieldRules = _rules[field],
        valid = true,
        validationParams = {}
      ;

      Object.keys( fieldRules ).forEach( rule => {
        validationParams = [ value ].concat( fieldRules[rule] );

        if (_validators[rule].apply( null, validationParams )) {
          _setError(field, rule, true);
        }
        else {
          valid = false;
          _setError(field, rule, false);
        }
      });

      return valid;
    }
  }

})();
