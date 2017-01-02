require.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'libs/jquery/jquery-2.1.4.min',
    'underscore': 'libs/underscore/underscore.min',
    'backbone': 'libs/backbone/backbone-min',
    'localStorage': 'libs/backbone/backbone.localStorage',
    'associate': 'libs/backbone/backbone.associate',
    'masonry': 'libs/masonry/masonry.pkgd.min',
    'imagesLoaded': 'libs/masonry/imagesLoaded.pkgd',
    'text': 'libs/require/text'
  },
  shims: {
    'underscore': { exports: '_' },
    'jquery': { exports: '$' },
    'backbone': { 
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'localStorage': { exports: 'Store' },
    'associate': { exports: 'Backbone' },
    'masonry': { exports: 'Masonry' },
    'imagesLoaded': { exports: 'imagesLoaded' }
  }
});

// Test Item Model and View
require([
  'models/item',
  'models/list',
  'collections/lists',
  'collections/items',
  'views/itemView',
  'views/listView',
  'router/router'],
  function(
    Item,
    List,
    stokLists,
    stokItems,
    itemView,
    listView,
    Workspace) {  

    // Make Default List!!!
    stokLists.create({title: 'All-In-One Bag'});
    // Make Default Items!!!
    var fixtureListId = stokLists.get('c1').cid;
    stokItems.add({
      name: 'GR1',
      manufacturer: 'GORUCK',
      price: 295,
      url: 'http://www.goruck.com/gr1-black-/p/GEAR-000066',
      img: 'img/gr1.jpg',
      list: fixtureListId
    });
    stokItems.add({
      name: 'Spa Pouch',
      manufacturer: 'C&ocirc;te&amp;Ciel',
      price: 115,
      url: 'http://www.coteetciel.com/en-US/beautycase-toiletery-bag-lagoon-spa-pouch-black-currant-small-neoprene-travel',
      img: 'img/spa_pouch.jpg',
      list: fixtureListId
    });
    stokItems.add({
      name: 'Professional 2',
      manufacturer: 'HHKB',
      price: 235,
      url: 'https://elitekeyboards.com/products.php?sub=pfu_keyboards,hhkbpro2&pid=pdkb400b',
      img: 'img/hhkbII.jpg',
      list: fixtureListId
    });

    // localStorage.clear();
    console.log(stokLists);
    console.log(stokItems);

    var stokRouter = new Workspace();
    Backbone.history.start();

});