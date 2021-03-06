(function () {
  'use strict';

  angular
    .module('model')
    .factory('model.HeroFactory', Factory);

  Factory.$inject = [];

  function Factory(ComicFactory) {
    var self = this;

    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create(name, description, image) {
      return new Hero(name, description, image);
    }

    function fromJsonObject(jsonObject) {
      return new Hero(jsonObject.name, jsonObject.description, jsonObject.image)
    }

    return self;
  }

  function Hero(name, description, image) {
    var self = this;

    var _name = name;
    var _description = description;
    var _image = image;
    var _comics = [];

    /* Public methods */
    self.getName = getName;
    self.getDescription = getDescription;
    self.getImage = getImage;
    self.getComics = getComics;
    self.pushComic = pushComic;
    self.toJson = toJson;

    function getName() {
      return _name;
    }

    function getDescription() {
      return _description;
    }

    function getImage() {
      return _image.path + "." + _image.extension;
    }

    function getComics() {
      return _comics;
    }

    function pushComic(comic) {
      _comics.push(comic);
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