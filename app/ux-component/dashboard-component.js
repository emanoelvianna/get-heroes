(function () {
  'use strict';

  angular
    .module('uxComponent')
    .component('dashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-template.html'
    });

  Controller.$inject = [
    'services.CommunicationService'
  ];

  function Controller(CommunicationService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      CommunicationService.getCharacters('thor');
    }

  }
}());