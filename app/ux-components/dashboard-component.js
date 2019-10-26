(function () {
  'use strict';

  angular
    .module('uxComponent')
    .component('dashboard', {
      controller: Controller,
      templateUrl: 'app/ux-components/dashboard-template.html'
    });

  Controller.$inject = [
    'services.CommunicationService'
  ];

  function Controller(CommunicationService) {
    var self = this;
    self.heroes = [];
    self.heroSelected = undefined;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      CommunicationService.getHeroes().then(function (heroes) {
        self.heroes = heroes;
      }, function (err) {
        throw Error(err);
      });
    }

  }
}());