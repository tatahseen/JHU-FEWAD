(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
    .directive('foundItems', FoundItems)


    function FoundItems () {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        }
      };
      return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
      var menu = this;
      menu.found = [];
      menu.searchTerm = "";
        
      menu.narrowItems = function (){
        if (!menu.searchTerm) {
          menu.found = [];
          return;
        }
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm)
        promise.then(function (response) {
          menu.found = response;
        })
        .catch(function(error){
          console.log("Something went terribly wrong");
        })
      };

      menu.removeItem = function(index) {
        menu.found.splice(index, 1);
      };
    };
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: ApiBasePath + "/menu_items.json"
        }).then(function (response) {
          var foundItems = [];

          var categories = Object.values(response.data);
          for (var i = 0; i < categories.length; i++) {
            var items = categories[i].menu_items || [];
            for (var j = 0; j < items.length; j++) {
              var item = items[j];
              if (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                foundItems.push(item);
              }
            }
          }

          return foundItems;
        }).catch(function (error) {
          console.error("$http error:", error);
          return [];
        });
      };
    }
})();