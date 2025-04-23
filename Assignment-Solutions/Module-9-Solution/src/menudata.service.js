(function () {
    'use strict';
  
    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('apiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/');
  
    MenuDataService.$inject = ['$http', 'apiBasePath'];
    function MenuDataService ($http, apiBasePath) {
      var service = this;
  
      service.getAllCategories = function () {
        var response = $http({
          method: 'GET',
          url: (apiBasePath + 'categories.json')
        });
  
        return response;
      }
  
      service.getItemsForCategory = function (categoryShortName) {
        var response = $http({
          method: 'GET',
          url: (apiBasePath + 'menu_items/' + categoryShortName + '.json')
        });

        return response;
      }
    }
  
  })();