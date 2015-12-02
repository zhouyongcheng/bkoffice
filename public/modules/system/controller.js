/**
 * 系统设定功能模块
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('systemControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('systemController', function($scope) {
            $scope.message = '';
        })
        // 系统设定
        .controller('systemListController', function($scope,$state,Restangular) {
            
        })
        // 系统设定
        .controller('systemAddController', function($scope,$state,Restangular) {
            
        })
        // 系统设定
        .controller('systemEditController', function($scope,$state,Restangular,$stateParams) {
            
        })
            
    });