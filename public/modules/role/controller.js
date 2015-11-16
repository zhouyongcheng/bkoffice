define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('roleControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('RoleController', function($scope) {
            $scope.message = '';
        })
        .controller('RoleListController', function($scope,$state,Restangular) {
            Restangular.one('/role/search/_').get().then(function(data) {
                console.log(data.result);
                $scope.roles = data.result;
            });
            console.log('------------查询注册的用户-------------');

            $scope.edit = function(_id) {
                $state.go('dashboard.role.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        }).controller('RoleAddController', function($scope,$state,Restangular) {
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