(function () {
  'use strict';

  angular
    .module('edata')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$routeParams', '$location', 'userService'];

  function UserController($scope, $routeParams, $location, userService)
  {
    var vm = this;
    vm.fill = fill;
    vm.reset = reset;
    vm.submit = submit;
    vm.validateField = validateField;

    initialization();

    function initialization() {
      initUserData();

      if ($routeParams.id) {
        userService.getUser($routeParams.id)
          .then(bindRetrievedUser)
          .catch(showError)
        ;
      }
    }

    function fill() {
      let exampleUser = {
        expireDate: new Date().toISOString().replace('Z','+00:00'),
        firstName: 'Guanchor',
        lastName: 'Ojeda',
        status: 'active'
      };
      setUserData(exampleUser);
      validateForm();
    }

    function reset() {
      setUserData(vm.initialUser);
    }

    function submit() {
      userService.save(vm)
        .then(redirect)
        .catch(manageErrors)
      ;
    }

    function initUserData() {
      setUserData({});
      vm.initialUser = getUserData();
    }

    function setUserData(data) {
      vm._id = data._id ? data._id : null;
      vm._rev = data._rev ? data._rev : null;
      vm.expireDate = data.expireDate ? data.expireDate : null;
      vm.firstName = data.firstName ? data.firstName : '';
      vm.lastName = data.lastName ? data.lastName : '';
      vm.status = data.status ? data.status : null;
    }

    function getUserData(data) {
      return {
        _id: vm._id,
        _rev: vm._rev,
        expireDate: vm.expireDate,
        firstName: vm.firstName,
        lastName: vm.lastName,
        status: vm.status
      }
    }

    function bindRetrievedUser(user) {
      setUserData(user);
      vm.initialUser = getUserData();
      $scope.$apply();
    }

    function showError(error) {
      vm.errorMessage = error;
      $scope.$apply();
    }

    function validateForm() {
      validateField('expireDate');
      validateField('firstName');
      validateField('lastName');
      validateField('status');
    }

    function validateField(field) {
      userService.validateField(field, vm[field]);
      updateFormValidity();
    }

    function manageErrors(error) {
      vm.errorMessage = error;
      updateFormValidity();
    }

    function updateFormValidity(error) {
      let errors = userService.getErrors();

      Object.keys( errors ).forEach( label  => {
        if ($scope.userForm.hasOwnProperty(label)) {
          Object.keys( errors[label] ).forEach( rule  => {
            $scope.userForm[label].$setValidity('custom-' + rule, errors[label][rule]);
          });
        }
      });
    }

    function redirect(response) {
      $location.path("users");
    }
  }

})();
