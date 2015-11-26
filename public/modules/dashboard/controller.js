define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {

    angular.module('dashboardControllers', ['restangular','ui.router', 'LocalStorageModule','developerModule'])
        .controller('DashboardController', function($scope,$state,Restangular,localStorageService) {

            $scope.logout = function() {
                var token = localStorageService.get('token');
                if (token) {
                    console.log("calling remove token begin");
                    localStorageService.remove('token');
                    Restangular.one('/signout', token).get().then(function(data) {
                        console.log(JSON.stringify(data));
                    }, function(e) {
                        console.log('exception');
                    });
                }
                $state.go('login');
            }
        });
});