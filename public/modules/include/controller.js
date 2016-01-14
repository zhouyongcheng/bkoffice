define(['angular', 'atmLogger'], function(angular) {

    var sub = angular.module('includeControllers',['atm.logger']);

    sub.controller('includeController', ['loggerService','$scope',function(loggerService, $scope) {
        $scope.header = "this is header information";
        $scope.body1 = "this is body1 information";
        $scope.body2 = "this is body2 content";
        $scope.footer = "this is footer information";

        $scope.change = function(key) {

            loggerService.debug("i love this game")

            $scope.key = key;
        }

    }]);
});