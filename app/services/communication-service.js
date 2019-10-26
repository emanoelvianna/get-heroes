(function () {
  'use strict';

  angular
    .module('services')
    .service('services.CommunicationService', Service);

  Service.$inject = [
    '$q',
    'routes.RouteResourceFactory',
    'model.ComicFactory',
    'model.HeroFactory'
  ];

  function Service($q, RouteResourceFactory, ComicFactory, HeroFactory) {
    var heroesSelected = ['Daredevil', 'Doctor Strange', 'Black Panther'];
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
            _getComicsByCharacterId(item.id).then(function (comics) {
              comics.forEach(function (comic) {
                heroe.pushComic(comic);
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

    function _getComicsByCharacterId(characterId) {
      var request = $q.defer();
      var comics = [];
      RouteResourceFactory.getComicsByCharacterId({ characterId: characterId }).$promise.then(function (response) {
        response.data.results.map(function (item) {
          var comic = new ComicFactory.create(item.title, item.description, item.thumbnail);
          comics.push(comic);
        });
        request.resolve(comics);
      }, function (err) {
        throw Error(err);
      });
      return request.promise;
    }

  }
}());