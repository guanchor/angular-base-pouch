(function () {
  'use strict';

  angular
    .module('edata')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$scope'];

  function UsersController($scope)
  {
    var vm = this;
    var TAG = 'UsersController';

    initialization();

    function initialization() {}
  }

})();
