// collections, lists.js

define([
  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  'models/list'
  ],
  function($,_,Backbone,Store,List) {

    var Lists = Backbone.Collection.extend({
      model: List,
      localStorage: new Backbone.LocalStorage('stok-lists')
    });

    var stokLists = new Lists();

    return stokLists;
});