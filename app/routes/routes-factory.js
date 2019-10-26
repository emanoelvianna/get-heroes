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
    const KEY = '001ac6c73378bbfff488a36141458af2';
    const TS = 'thesoer';
    const HASH = '72e5ed53d1398abb831c3ceec263f18b';

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

      getStoriesByCharacterId: {
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