(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('items', {
        templateUrl: 'src/templates/itemsList.template.html',
        bindings: {
            items: '<'
        }
    });
})();
  