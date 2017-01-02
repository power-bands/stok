// view, listView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/listViewTemplate.html'],
  function($,_,Backbone,listViewTemplate) {

    var listView = Backbone.View.extend({
      tagName: 'div',
      className: 'list',
      template: _.template(listViewTemplate),
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
    });

    return listView;
  });