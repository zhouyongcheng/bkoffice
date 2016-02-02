define(['angular', 'uiRouter','angularLocalStorage','atmLogger'], function(angular) {
    angular.module('loginControllers', ['restangular','ui.router', 'LocalStorageModule','atm.logger'])
        .controller('LoginController', ['$scope','$state','Restangular','localStorageService','loggerService',
            function($scope,$state,Restangular,localStorageService,loggerService) {
            $scope.user = {};
            $scope.login = function() {
                Restangular.all('/signin').post($scope.user).then(function(data) {
                    localStorageService.set('token', data.result);
                    console.log("login user information begin");
                    console.log(JSON.stringify(data));
                    console.log("login user information end");
                    $state.transitionTo('dashboard.distributor.list');
                }, function(e) {
                    console.log("error occurs" + e);
                });
            }
    }]);
});