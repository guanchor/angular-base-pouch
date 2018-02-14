(function () {
  'use strict';

  angular
    .module('edata')
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  function HomeController()
  {
    var vm = this;

    initialization();

    function initialization() {}
  }

})();
