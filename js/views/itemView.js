// view, itemView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/itemViewTemplate.html'],
  function($,_,Backbone,itemViewTemplate) {

    var itemView = Backbone.View.extend({
      tagName: 'div',
      className: 'item',
      template: _.template(itemViewTemplate),
      // events: {
      //   'click .item-edit': 'showEditView'
      // },
      initialize: function() {
        this.render();
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(Backbone, 'refreshViews', this.remove);
      },
      render: function() {
        var attrCID = _.extend(this.model.toJSON(), {cid: this.model.cid});
        this.$el.html(this.template(attrCID));
        return this;
      }
      // showEditView: function() {}
      // This will ~generate~ an itemEditView
      // which will try to use existing data, 
      // if any, to fill placeholders
    });

    return itemView;
});