/**
 * 安家中国开发商管理模块(Controller)
 */
define(['angular', 'lodash', 'uiRouter','angularLocalStorage'], function(angular,_) {

    angular.module('developerControllers', ['restangular', 'ui.router', 'LocalStorageModule'])
        // 注控制器
        .controller('developerController', function($scope) {

        })
        // 开发商一览页面控制器
        .controller('developerListController', function($scope,$state,Restangular) {
            Restangular.one('/developer/list/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                $scope.developers = data.result;
            });

            // 跳转到开发商配置管理画面
            $scope.edit = function(_id) {
                $state.go('dashboard.config.basic', {
                    nid:_id,
                    category:'developer'
                });
            };

        // 添加开发商页面控制器
        }).controller('developerAddController', function($scope,$state,Restangular) {

            $scope.message = '';

            $scope.create = function() {
                Restangular.all('/developer/create').post($scope.developer).then(function(data) {
                    $state.go('dashboard.developer.list');
                }, function(e) {
                    $scope.message = '创建开发商失败！';
                    console.log(JSON.stringify(e));
                });
            };

            $scope.back = function() {
                $state.go('dashboard.developer.list');
            };

        // 编辑开发商页面控制器
        }).controller('developerEditController', function($scope,$state,Restangular,$stateParams) {

            var project = function() {
                $state.go('dashboard.project.list');
            };

            $scope.menus = [{
                process: project,
                label:'楼盘管理'
            }];

            // 获取开发商的详细情报
            Restangular.one("/developer/details", $stateParams.nid).get().then(function(developer) {
                $scope.developer = developer.result;
            });

            // 显示开发商的基本情报
            $scope.doBasic = function() {
                $state.go('dashboard.config.basic',{
                    category:'developer',
                    nid:$scope.developer._id,
                    node_name:$scope.developer.name
                });
            };

            // 代理店用户一览
            $scope.listUser = function() {
                $state.go('dashboard.config.listUser', {
                    category:'developer',
                    nid:$scope.developer._id,
                    node_name:$scope.developer.name
                });
            };

            // 代理店用户添加
            $scope.addUser = function() {
                $state.go('dashboard.config.addUser', {
                    category:'developer',
                    nid:$scope.developer._id,
                    node_name:$scope.developer.name
                });
            };

            // 代理店的角色一览
            $scope.listRole = function() {
                $state.go('dashboard.config.listRole', {
                    category:'developer',
                    nid:$scope.developer._id,
                    node_name:$scope.developer.name
                });
            };

            // 给代理店添加角色
            $scope.addRole = function() {
                $state.go('dashboard.config.addRole', {
                    category:'developer',
                    nid:$scope.developer._id,
                    node_name:$scope.developer.name
                });
            };

            $scope.settingPermission = function() {
                $state.go('dashboard.config.permission', {
                    category:'developer',
                    nid:$scope.developer._id,
                    node_name:$scope.developer.name
                });
            };
        });
});