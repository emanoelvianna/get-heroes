(function () {
  'use strict';

  angular
    .module('services')
    .service('services.CommunicationService', Service);

  Service.$inject = [
    '$q',
    'routes.RouteResourceFactory',
    'model.HeroFactory'
  ];

  function Service($q, RouteResourceFactory, HeroFactory) {
    var heroesSelected = ['Daredevil', 'Hulk', 'Wolverine'];
    var heroes = [];
    var self = this;

    /* Public methods */
    self.getHeroes = getHeroes;

    function getHeroes() {
      var request = $q.defer();
      heroesSelected.forEach(function (heroe) {
        RouteResourceFactory.getCharacters({ nameStartsWith: heroe }).$promise.then(function (response) {
          return response.data.results.map(function (item) {
            var heroe = new HeroFactory.create(item.name, item.description, item.thumbnail);
            _getStoriesByCharacterId(item.id).then(function (stories) {
              stories.forEach(function (storie) {
                heroe.pushStorie(storie);
              });
              heroes.push(heroe);
              if (heroes.length == 3)
                request.resolve(heroes);
            }, function (err) {
              throw Error(err);
            });
          });
        });
      });
      return request.promise;
    };

    function _getStoriesByCharacterId(characterId) {
      var request = $q.defer();
      var stories = [];
      RouteResourceFactory.getStoriesByCharacterId({ characterId: characterId }).$promise.then(function (response) {
        response.data.results.map(function (item) {
          stories.push(item);
        });
        request.resolve(stories);
      }, function (err) {
        throw Error(err);
      });
      return request.promise;
    }

  }
}());