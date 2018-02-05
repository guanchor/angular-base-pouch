(function () {
  'use strict';

  angular.module('edata')
    .controller('StartController', StartController);

  StartController.$inject = [];

  function StartController()
  {
    var vm = this;
    var TAG = 'StartController';

    initialization();

    function initialization() {}
  }

})();
