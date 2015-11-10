/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('userControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('UserController', function($scope) {
            $scope.message = '';
        })
        .controller('UserListController', function($scope,$state,Restangular,localStorageService) {

            $scope.edit = function(_id) {
                $state.go('dashboard.user.edit', {id:_id});
            }

            $scope.delete = function(_id) {

            }

        }).controller('UserAddController', function($scope,$state,Restangular) {
            $scope.user = {};

            $scope.create = function() {
                Restangular.all('/signup').post($scope.user, function(user) {
                    console.log(JSON.stringify(user));
                    $state.go('dashboard.user.list');
                });
            };

            $scope.back = function() {
                $state.go('dashboard.user.list');
            }
        }).controller('UserEditController', function($scope,$state,Restangular,$stateParams) {


            $scope.save = function () {
                $state.transitionTo('dashboard.user.list');
            };

            $scope.back = function() {
                $state.go('dashboard.user.list');
            };
        });
});