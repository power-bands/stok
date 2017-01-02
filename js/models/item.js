// models, item.js

define([
  'underscore',
  'backbone'],
  function(_,Backbone){
    
    var Item = Backbone.Model.extend({
      defaults: {
        name: '',
        manufacturer: '',
        price: 0,
        url: '',
        img: '',
        list: '' 
      }
    });

    return Item;
});