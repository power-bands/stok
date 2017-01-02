// router, router.js

define([
  'jquery',
  'backbone',
  'views/listView',
  'views/itemView',
  'views/listEditView',
  'views/itemEditView',
  'views/listTopView',
  'collections/lists',
  'collections/items',
  'front/masonryConfig',
  'imagesLoaded'],
  function(
    $,
    Backbone,
    listView,
    itemView,
    listEditView,
    itemEditView,
    listTopView,
    stokLists,
    stokItems,
    msnry,
    imagesLoaded) {
    var Workspace = Backbone.Router.extend({
      routes: {
        '/'               : 'getLists',
        'lists'           : 'getLists',
        'list/:id'        : 'getList',
        'lists/add'       : 'addList',
        'list/:id/edit'   : 'editList',
        'list/:id/add'    : 'addItem',
        'item/:id/edit'   : 'editItem',
        '*notFound'       : 'getLists'
      },
      getLists: function() {
        var add = this.getHeaderAdd(),
            wrap = $('.content-wrap');
      
        // Revert header-add back to appropriate state
        if (add.className == 'header-add--back') {
          add.className = 'header-add';
          add.href = '#lists/add';
          add.innerHTML = '&plus; list';
        }

        // Reset Masonry and remove any existing views
        Backbone.trigger('refreshViews');
        msnry.layout();
        
        // Render all list models
        stokLists.each(function(list) {
          var buffer = new listView({model:list});
          wrap.append(buffer.$el);
          msnry.appended(buffer.$el);
          msnry.reloadItems();
          msnry.layout();
        });
      },
      getList: function(id) {
        var add = this.getHeaderAdd(),
            wrap = $('.content-wrap'),
            items = stokItems.where({list: id}),
            $views = [];

        // Revert header-add back to appropriate state
        if (add.className == 'header-add') {
          add.className = 'header-add--back';
          add.href = '#lists';
          add.innerHTML = 'lists';
        } 

        // Reset Masonry and remove any existing views
        Backbone.trigger('refreshViews');
        msnry.layout();

        // get list by id and render list--top
        var top = new listTopView({model: stokLists.get(id)});
        $('.header').after(top.$el);

        // get items of list and render!
        _.forEach(items,function(item) {
          var buffer = new itemView({model:item}),
              view = buffer.$el;

          view.hide();
          wrap.append(view);

          imagesLoaded(view, function() {
            msnry.appended(view);
            msnry.reloadItems();
            msnry.layout();
            view.show();
          });
        });
      },
      addList: function() {
        var newList = new listEditView();
        $('body').append(newList.$el);
      },
      editList: function(id) {
        var list = stokLists.get(id), 
            editList = new listEditView({model:list});
        $('body').append(editList.$el);
      },
      addItem: function(id) {
        var newItem = new itemEditView(id);
        $('body').append(newItem.$el);
      },
      editItem: function(id) {
        var item = stokItems.get(id), 
            editItem = new itemEditView({model:item});
        $('body').append(editItem.$el);
      },
      // helper functions
      getHeaderAdd: function() {
        var add = document.querySelector('[class^=header-add]');
        return add;
      }
    });

    return Workspace;
});