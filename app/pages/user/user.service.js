(function () {
  'use strict';

  angular
    .module('edata')
    .factory('userService', userService);

  userService.$inject = ['$window', '$q', 'pouchdbService'];

  function userService($window, $q, pouchdbService) {
    var _errors = [],
      _rules = {
        expireDate: { 'required': null },
        firstName: { 'required': null, 'maxLength': 100 },
        lastName: { 'required': null, 'maxLength': 100 },
        status: { 'required': null },
      },
      _setError = function(field, rule, status) {
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
      save: save,
      validateField: validateField
    };
    return service;
    //

    function getErrors() {
      return _errors;
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

      return pouchdbService.save(doc);
        //.then(saveComplete)
        //.catch(saveError)
      ;

      function saveBind(data) {
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

      function saveError(error) {
        return false;
      }

      function saveComplete(response) {
        return db.get(response.id);
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
