/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('outletControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('outletController', function($scope) {
            $scope.message = '';
        })
        // 门店一览机能
        .controller('outletListController', function($scope,$state,Restangular) {
            Restangular.one('/outlet/list/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                $scope.outlets = data.result;
            });

            // 跳转到开发商配置管理画面
            $scope.edit = function(_id) {
                $state.go('dashboard.config.basic', {
                    nid:_id,
                    category:'outlet'
                });
            };
        })
        // 门店添加机能
        .controller('outletAddController', function($scope,$state,Restangular) {
            $scope.message = '';
            $scope.create = function() {
                Restangular.all('/outlet/create').post($scope.outlet).then(function(data) {
                    $state.go('dashboard.outlet.list');
                }, function(e) {
                    $scope.message = '创建开发商失败！';
                    console.log(JSON.stringify(e));
                });
            };

            $scope.back = function() {
                $state.go('dashboard.outlet.list');
            };
        })
        // 门店配置机能
        .controller('outletEditController', function($scope,$state,Restangular,$stateParams) {
            // 获取开发商的详细情报
            Restangular.one("/outlet/details", $stateParams.nid).get().then(function(outlet) {
                $scope.outlet = outlet.result;
            });

            // 显示开发商的基本情报
            $scope.doBasic = function() {
                $state.go('dashboard.config.basic',{
                    category:'outlet',
                    nid:$scope.outlet._id,
                    node_name:$scope.outlet.name
                });
            };

            // 代理店用户一览
            $scope.listUser = function() {
                $state.go('dashboard.config.listUser', {
                    category:'outlet',
                    nid:$scope.outlet._id,
                    node_name:$scope.outlet.name
                });
            };

            // 代理店用户添加
            $scope.addUser = function() {
                $state.go('dashboard.config.addUser', {
                    category:'outlet',
                    nid:$scope.outlet._id,
                    node_name:$scope.outlet.name
                });
            };

            // 代理店的角色一览
            $scope.listRole = function() {
                $state.go('dashboard.config.listRole', {
                    category:'outlet',
                    nid:$scope.outlet._id,
                    node_name:$scope.outlet.name
                });
            };

            // 给代理店添加角色
            $scope.addRole = function() {
                $state.go('dashboard.config.addRole', {
                    category:'outlet',
                    nid:$scope.outlet._id,
                    node_name:$scope.outlet.name
                });
            };

            $scope.settingPermission = function() {
                $state.go('dashboard.config.permission', {
                    category:'outlet',
                    nid:$scope.outlet._id,
                    node_name:$scope.outlet.name
                });
            };
        });
});