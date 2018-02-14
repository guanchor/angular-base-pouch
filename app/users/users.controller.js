(function () {
  'use strict';

  angular
    .module('edata')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$scope', 'usersService'];

  function UsersController($scope, usersService)
  {
    var vm = this;
    vm.filterUsers = filterUsers;
    vm.formatDate = formatDate;
    vm.remove = remove;
    vm.sync = sync;
    vm.userIsActive = userIsActive;
    vm.userIsBlocked = userIsBlocked;
    vm.userIsDeleted = userIsDeleted;

    initialization();

    function initialization() {
      vm.errorMessage = '';
      vm.filter = 'all';
      vm.stateFilter = '';
      vm.users = [];

      fetchUsers();
    }

    function fetchUsers() {
      usersService.fetch()
        .then(setUsers)
        .catch(showError)
      ;
    }

    function filterUsers() {
      if (vm.filter === 'not_expired') {
        usersService.notExpired(vm.filter)
          .then(setUsers)
          .catch(showError)
        ;
      }
      else {
        fetchUsers();
      }
    }

    function formatDate(dateString) {
      let date = new Date(dateString);
      return date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
    }

    function remove(index) {
      usersService.remove(getUserId(index), getUserRev(index))
        .then(unsetUser(index))
        .catch(showError)
      ;
    }

    function sync() {
      usersService.sync(vm.users)
        .then(showConfirm)
        .catch(showError)
      ;
    }

    function userIsActive(index) {
      return vm.users[index].doc.status === 'active';
    }

    function userIsBlocked(index) {
      return vm.users[index].doc.status === 'blocked';
    }

    function userIsDeleted(index) {
      return vm.users[index].doc.status === 'deleted';
    }

    function setUsers(data) {
      vm.users = data;
      $scope.$apply();
    }

    function unsetUser(index) {
      vm.users.splice(index, 1);
    }

    function getUserId(index) {
      return  vm.users[index].doc._id;
    }

    function getUserRev(index) {
      return  vm.users[index].doc._rev;
    }

    function showError(error) {
      vm.errorMessage = error;
    }

    function showConfirm(response) {
      vm.errorMessage = response;
    }
  }

})();
