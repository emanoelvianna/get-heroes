(function () {
  'use strict';

  angular
    .module('model')
    .factory('model.ComicFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create(name, description, image) {
      return new Comic(name, description, image);
    }

    function fromJsonObject(jsonObject) {
      return new Comic(jsonObject.name, jsonObject.description, jsonObject.image)
    }

    return self;
  }

  function Comic(title, description, image) {
    var self = this;

    var _title = title;
    var _description = description;
    var _image = image;

    /* Public methods */
    self.getTitle = getTitle;
    self.getDescription = getDescription;
    self.getImage = getImage;
    self.toJson = toJson;

    function getTitle() {
      return _title;
    }

    function getDescription() {
      return _description;
    }

    function getImage() {
      return _image.path + "." + _image.extension;
    }

    function toJson() {
      var json = {};

      json.name = _name;
      json.description = _description;
      json.imagem = _imagem;

      return JSON.stringify(json);
    }
  }
}());