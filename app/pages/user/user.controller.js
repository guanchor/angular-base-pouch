(function () {
  'use strict';

  angular
    .module('edata')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope'];

  function UserController($scope)
  {
    var vm = this;
    var TAG = 'UserController';

    initialization();

    function initialization() {}
  }

})();
