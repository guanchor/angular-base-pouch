(function () {
  'use strict';

  angular
    .module('edata')
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  function HomeController()
  {
    var vm = this;
    var TAG = 'HomeController';

    initialization();

    function initialization() {}
  }

})();
