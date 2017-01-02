// views, listTopView.js

define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/listTopViewTemplate.html'],
  function(_,$,Backbone,listTopViewTemplate) {

    var listTopView = Backbone.View.extend({
      tagName: 'div',
      className: 'list--top cf',
      template: _.template(listTopViewTemplate),
      events: {
        'click .list-add': 'showItemAddView'
      },
      initialize: function() {
        this.render();
        Backbone.on('refreshViews', this.remove, this);
      },
      render: function() {
        var attrCID = _.extend(this.model.toJSON(), {cid: this.model.cid});
        this.$el.html(this.template(attrCID));
        return this;
      }
    });

    return listTopView;
  });