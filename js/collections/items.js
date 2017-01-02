// collections, items.js

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'models/item'
  ],
  function($,_,Backbone,Store,Item) {

    var Items = Backbone.Collection.extend({
      model: Item,
      localStorage: new Backbone.LocalStorage('stok-items')
    });

    var stokItems = new Items();

    return stokItems;
});