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
    self.resource = null;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.getCharacters = getCharacters;

    onInit();

    function onInit() {
      self.resource = RouteResourceFactory.create();
    }

    function getCharacters(val) {
      if (self.resource)
        self.resource.getCharacters(val).then(function (response) {
          $scope.charInfoArr = response.data.data.results;
          return response.data.data.results.map(function (item) {
            console.log(item.name);
          });
        });
    };

  }
}());