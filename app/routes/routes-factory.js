(function () {
  'use strict';

  angular
    .module('routes')
    .factory('routes.RouteResourceFactory', RouteResourceFactory);

  RouteResourceFactory.$inject = [
    '$resource'
  ];

  function RouteResourceFactory($resource) {
    var SUFFIX = 'http://gateway.marvel.com/v1/public/';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return $resource({}, {}, {
        getCharacters: {
          url: SUFFIX + '/characters',
          method: 'GET',
          params: {
            nameStartsWith: '@character',
            limit: 25,
            ts: 'thesoer',
            apikey: '001ac6c73378bbfff488a36141458af2',
            hash: '72e5ed53d1398abb831c3ceec263f18b'
          }
        },
      });
    }
    return self;
  }

}());