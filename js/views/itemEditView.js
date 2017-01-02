// view, itemEditView.js

define([
  'underscore',
  'jquery',
  'backbone',
  'collections/items',
  'text!templates/itemEditViewTemplate.html',
  'text!templates/itemEditViewTemplate--attr.html'],
  function(_,$,Backbone,stokItems,itemEdit,itemAttrEdit) {

    var itemEditView = Backbone.View.extend({
      tagName: 'div',
      className: 'modal',
      newTemplate: _.template(itemEdit),
      editTemplate: _.template(itemAttrEdit),
      events: {
        'click .collect-submit'   : 'updateItem',
        'click .collect-close'    : 'closeEditView',
        'click .collect-delete'   : 'deleteItem'
      },
      initialize: function(id) {
        this.render(id);
      },
      render: function(id) {
        if (this.model) {
          this.$el.html(this.editTemplate(this.model.attributes));
        } else {
          // render without model
          this.$el.html(this.newTemplate({list: id}));
        }
        
        return this;
      },
      updateItem: function(e) {
        e.preventDefault();
        var inputs = this.getInputs();

        if (this.model) {
          this.model.set(inputs);
        } else {
          stokItems.add(inputs);
        }

        this.remove();
        window.history.back();
      },
      getInputs: function() {

        var fields = this.$('form')[0].elements,
            // this is hacky
            keys = ["name", "manufacturer", "price", "url", "img", "list"]
            values = {};

        _.forEach(keys, function(key) {
          if (fields[key] && fields[key].value.length !== 0) {
            values[key] = fields[key].value;
          }
        }); 

        return values;
      },
      deleteItem: function(e) {
        e.preventDefault();
        if (this.model) { stokItems.remove(this.model); }
        this.remove();
        window.history.back();
      },
      closeEditView: function(e) {
        e.preventDefault();
        $('body').remove('.modal');
        this.remove();
        window.history.back();
      }
    });

    return itemEditView;
  });