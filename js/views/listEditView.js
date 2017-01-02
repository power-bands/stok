// views, listEditView.js

define([
  'underscore',
  'jquery',
  'backbone',
  'collections/lists',
  'text!templates/listEditViewTemplate.html',
  'text!templates/listEditViewTemplate--attr.html'],
  function(_,$,Backbone,stokLists,listEdit,listAttrEdit) {

    var listEditView = Backbone.View.extend({
      tagName: 'div',
      className: 'modal',
      newTemplate: _.template(listEdit),
      editTemplate: _.template(listAttrEdit),
      events: {
        'click .collect-submit'   : 'updateList',
        'click .collect-close'    : 'closeEditView',
        'click .collect-delete'   : 'deleteList'
      },
      initialize: function() {
        this.render();
      },
      render: function() {
        if (this.model) {
          this.$el.html(this.editTemplate(this.model.attributes));
        } else {
          // render without model 
          this.$el.html(this.newTemplate());
        }
 
        return this;
      },
      updateList: function(e) {
        e.preventDefault();
        var title = this.$('form')[0].elements.title.value;

        if (this.model) {
          if (title.trim().length > 0) {
            this.model.set('title',title);
          }
        } else {
          stokLists.add({title: title});
        }

        this.remove();
        window.history.back();
      },
      deleteList: function(e) {
        e.preventDefault();
        if (this.model) {
          stokLists.remove(this.model);
        }

        this.remove();
        window.location.hash = '#';
        console.log(window.location);
        console.log(document.location);
      },
      closeEditView: function(e) {
        e.preventDefault();
        $('body').remove('.modal');
        this.remove();
        window.history.back();
      }
    });

    return listEditView;
  });