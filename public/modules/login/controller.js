define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('loginControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('LoginController', function($scope,$state,Restangular,localStorageService) {
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
    });
});