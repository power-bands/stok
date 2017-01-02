// models, list.js

define([
  'underscore',
  'backbone',
  'collections/items'],
  function(_,Backbone,stokItems){
    
    var List = Backbone.Model.extend({
      defaults: {
        title: '',
        _total: 0,
        _no: 0
      },
      getitems: function(stokItems) {
        if (this.cid) {
          return stokItems.where({list: this.cid});
        }
      },
      initialize: function() {
        this.setNotes();
        this.listenTo(stokItems,'update', this.setNotes);
        console.log(this);
      },
      setNotes: function() {
        var prices = [],
            items = this.getitems(stokItems);

        _.forEach(items,function(item) {
          prices.push(item.attributes.price);
        });

        var total = prices.reduce(function(p,c,i,a) {
          return parseInt(p) + parseInt(c);
        },0);

        this.set('_no', prices.length);
        this.set('_total', total);

      }
    });

    return List;
});