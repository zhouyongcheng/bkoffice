define(['jquery', 'angular', 'uiRouter','angularLocalStorage'], function($, angular) {

    angular.module('dashboardControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('DashboardController', function($scope,$state,Restangular,localStorageService) {
            $(function() {
                $('#menu').metisMenu();
                $('#menu2').metisMenu({
                    toggle: false
                });
                $('#menu3').metisMenu({
                    doubleTapToGo: true
                });
                $('#menu4').metisMenu();
            });
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