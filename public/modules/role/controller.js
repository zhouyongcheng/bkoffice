define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('roleControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('RoleController', function($scope) {
            $scope.message = '';
        })
        .controller('RoleListController', function($scope,$state,Restangular) {

            $scope.edit = function(_id) {
                $state.go('dashboard.role.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        }).controller('RoleAddController', function($scope,$state,Restangular) {

            $scope.tabs = [
                { title:'Dynamic Title 1', content:'Dynamic content 1' },
                { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
            ];

            $scope.alertMe = function() {
                setTimeout(function() {
                    $window.alert('You\'ve selected the alert tab!');
                });
            };

            $scope.role = {};

            $scope.create = function() {

            };

            $scope.back = function() {
                $state.go('dashboard.role.list');
            }
        }).controller('RoleEditController', function($scope,$state,Restangular,$stateParams) {
            $scope.save = function () {
                $state.transitionTo('dashboard.role.list');
            };

            $scope.back = function() {
                $state.go('dashboard.role.list');
            };
        });
});