define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('loginControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('LoginController', function($scope,$state,Restangular,localStorageService) {
            $scope.user = {};
            $scope.login = function() {
                Restangular.all('/signin').post($scope.user).then(function(data) {

                    console.log('-------------sign in token------------------');
                    console.log(data.result);
                    console.log('-------------sign in token------------------');

                    localStorageService.set('token', data.result);
                    $state.go('dashboard.service.list');
                }, function(e) {
                    console.log("error occurs" + e);
                });
                $state.go('dashboard.service.list');
            }
    });
});