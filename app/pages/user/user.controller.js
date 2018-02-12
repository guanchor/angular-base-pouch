(function () {
  'use strict';

  angular
    .module('edata')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', 'userService'];

  function UserController($scope, userService)
  {
    var vm = this;
    vm.reset = reset;
    vm.submit = submit;
    vm.validateField = validateField;

    initialization();

    function initialization() {
      vm.expireDate = new Date();
      vm.firstName = 'Guanchor';
      vm.lastName = 'Ojeda';
      vm.status = 'active';
    }

    function reset() {
      initialization();
    }

    function validateField(field) {
      userService.validateField(field, vm[field]);
      updateErrorMessages();
    }

    function updateErrorMessages () {
      let errors = userService.getErrors();

      Object.keys( errors ).forEach( label  => {
        if ($scope.userForm.hasOwnProperty(label)) {
          Object.keys( errors[label] ).forEach( rule  => {
            errors[label][rule] ? null : console.error(label, rule, errors[label][rule]);
            $scope.userForm[label].$setValidity('custom-' + rule, errors[label][rule]);
          });
        }
        else {
          $scope.userForm.$invalid = true;
        }
      });
    }

    function submit() {
      userService.save(vm)
        .then(redirect)
        .catch(updateErrorMessages)
      ;
    }

    function redirect (response) {
      console.log(response);
      $state.go("users");
    }
  }

})();
