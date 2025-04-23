(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/templates/categoriesList.template.html',
        bindings: {
            items: '<'
        }
    });
})();