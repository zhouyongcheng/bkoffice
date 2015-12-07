/**
 * 系统设定功能模块
 */
define(['angular', 'jquery', 'uiRouter','angularLocalStorage'], function(angular,$) {
    angular.module('systemControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('systemController', function($scope) {
            $('#system_sidebar').metisMenu({
                toggle: true
            });
        })
        // 系统设定
        .controller('systemListController', function($scope,$state,Restangular) {
            $('#system_sidebar').metisMenu({
                toggle: true
            });
        })
        // 系统设定
        .controller('systemAddController', function($scope,$state,Restangular) {
            
        })
        // 系统设定
        .controller('systemEditController', function($scope,$state,Restangular,$stateParams) {
            
        })
        // 系统设定
        .controller('systemPermsListController', function($scope,$state,Restangular,$stateParams) {
            console.log("calling /perms/all");
            Restangular.one('/perms/all').get().then(function(data) {
                console.log("************all perms begin**************");
                console.log(data);
                console.log("************all perms end **************");
                $scope.perms = data.result;
            });
        })
        // 基础访问控制添加系统设定
        .controller('systemPermsController', function($scope,$state,Restangular,$stateParams) {

            $scope.save = function () {
                Restangular.all('/perms/create').post($scope.perm).then(function(data) {
                    console.log("**************************");
                    console.log(data);
                    console.log("**************************");
                });
            }
        })
    });