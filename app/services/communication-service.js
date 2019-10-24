(function () {
  'use strict';

  angular
    .module('services')
    .service('services.CommunicationService', Service);

  Service.$inject = [
    'routes.RouteResourceFactory'
  ];

  function Service(RouteResourceFactory) {
    var self = this;

    /* Public methods */
    self.getCharacters = getCharacters;
    self.getStoriesByCharacterId = getStoriesByCharacterId;

    function getCharacters(character) {
      RouteResourceFactory.getCharacters({ nameStartsWith: character }).$promise.then(function (response) {
        return response.data.results.map(function (item) {
          console.log(item);
          getStoriesByCharacterId(item.id);
        });
      });
    };


    function getStoriesByCharacterId(characterId) {
      RouteResourceFactory.getStoriesByCharacterId({ characterId: characterId }).$promise.then(function (response) {
        return response.data.results.map(function (item) {
          console.log(item);
        });
      });
    }

  }
}());