(function () {
    'use strict';
  
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
  
    ItemsController.$inject = ['items'];
    function ItemsController(items) {
        var controller = this;
        controller.items = items.data.menu_items;
    }
})();
  