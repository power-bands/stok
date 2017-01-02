// Initialize and Configure Masonry
define(['masonry'], function(Masonry){
  var grid = document.querySelector('.content-wrap');
  var msnry = new Masonry(grid, {
    itemSelector: '.list, .item',
    columnwidth: 320,
    "gutter": 25,
    transitionDuration: 0
  });

  return msnry;
});