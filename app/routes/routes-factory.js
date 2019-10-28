(function () {
  'use strict';

  angular
    .module('routes')
    .factory('routes.RouteResourceFactory', RouteResourceFactory);

  RouteResourceFactory.$inject = [
    '$resource'
  ];

  function RouteResourceFactory($resource) {
    const SUFFIX = 'http://gateway.marvel.com/v1/public';
    const KEY = '1e229818860f7081c532e634d8f6ae65';
    const TS = '1504796200286';
    const HASH = 'e02be810b65957f4b60b71ca89b8835f';

    return $resource({}, {}, {

      getCharacters: {
        url: SUFFIX + '/characters',
        method: 'GET',
        params: {
          nameStartsWith: '@nameStartsWith',
          limit: 1,
          ts: TS,
          apikey: KEY,
          hash: HASH
        }
      },

      getComicsByCharacterId: {
        url: SUFFIX + '/characters/:characterId/comics',
        method: 'GET',
        params: {
          characterId: '@characterId',
          limit: 5,
          ts: TS,
          apikey: KEY,
          hash: HASH
        }
      }

    });
  }

}());