(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('angularDollars', AngularDollarsFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var controller1 = this;
        controller1.items = ShoppingListCheckOffService.getItems();
        controller1.bought = function (item) {
            ShoppingListCheckOffService.boughtItem(item);
            controller1.items = ShoppingListCheckOffService.getItems();
        }
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        var controller2 = this;
        controller2.items = ShoppingListCheckOffService.getBoughtItems();
    };

    function ShoppingListCheckOffService () {
        var service = this;
        var items = [
            {id: 1, name: "bananas", quantity: 3, pricePerItem: 3.0},
            {id: 2, name: "milk", quantity: 1, pricePerItem: 5.0},
            {id: 3, name: "eggs", quantity: 12, pricePerItem: 0.25},
            {id: 4, name: "yogurt", quantity: 5, pricePerItem: 4.50},
            {id: 5, name: "mangos", quantity: 20, pricePerItem: 0.75},
            {id: 6, name: "chicken", quantity: 4, pricePerItem: 3.50}]
        var boughtItems = [];

        service.boughtItem = function(item) {
          items = items.filter(function(element) {
            return element.id != item.id;
          });
          boughtItems.push(item);
        };

        service.getBoughtItems = function() {
          return boughtItems;
        };

        service.getItems = function() {
          return items;
        };

      };

      function AngularDollarsFilter() {
        return function (input) {
          return "$$$" + parseFloat(input).toFixed(2);
        };
      }

})();