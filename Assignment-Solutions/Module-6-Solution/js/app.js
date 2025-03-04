(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope){
        $scope.checkLunch = function () {
            var meals = $scope.meals;
            var numMeals = meals.split(',').filter(meal => meal.trim()).length;
            $scope.class = "data";

            if(numMeals > 3){
                $scope.output = "Too Much!";
            }
            else if(numMeals > 0){
                $scope.output = "Enjoy!";
            }
            else{
                $scope.output = "Please enter data first";
                $scope.class = "noData";
            }
        }
    }
})();