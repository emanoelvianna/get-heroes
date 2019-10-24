(function () {
  'use strict';

  angular
    .module('routes')
    .service('routes.RestService', RestService);

  RestService.$inject = [
    'routes.RouteResourceFactory'
  ];

  function RestService(RouteResourceFactory) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getCharacters = getCharacters;

    function initialize() {
      _rest = RouteResourceFactory.create().create();

    }

    function getCharacters(val) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getLots({ acronym: centerAcronym }).$promise;
    }

  }
}());