define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('loginControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('LoginController', function($scope,$state,Restangular,localStorageService) {
            $scope.user = {};
            $scope.login = function() {
                Restangular.all('/signin').post($scope.user).then(function(data) {
                    localStorageService.set('token', data.result);
                    $state.transitionTo('dashboard.service.list');
                }, function(e) {
                    console.log("error occurs" + e);
                });
            }
    });
});