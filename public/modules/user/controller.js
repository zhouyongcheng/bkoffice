/**
 * 安家中国用户管理Controller
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('userControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('UserController', function($scope) {
            $scope.message = '';
        })
        .controller('UserListController', function($scope,$state,Restangular,$stateParams) {
            // 确定添加用户的节点类型及特定的节点ID
            $scope.category = $stateParams.category;
            $scope.node_name = $stateParams.node_name;

            // 查询该节点下的所有用户
            Restangular.one('/user/list/parent_id/'+ $stateParams.nid +'/keyword/_/sort/name/order/ASC/skip/_/limit/_').get().then(function(data) {
                $scope.users = data.result;
                console.log(JSON.stringify(data.result));
            });

            $scope.edit = function(_id) {
                $state.go('dashboard.user.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        // 添加用户功能控制器
        }).controller('UserAddController', function($scope,$state,Restangular,$stateParams) {
            $scope.node_name = $stateParams.node_name;
            $scope.user = {
                parentId : $stateParams.nid,
                accessibility:'_PUBLIC'
            };
            // 创建用户
            $scope.create = function() {
                Restangular.all('/user/add').post($scope.user).then(function(user) {
                    console.log("-----------创建用户begin-------------");
                    console.log(JSON.stringify(user));
                    console.log("-----------创建用户end-------------");
                    if (user) {
                        $state.go('dashboard.config.listUser', {
                            category:$stateParams.category,
                            nid:$stateParams.nid
                        });
                    }
                }, function(e) {
                    console.log(JSON.stringify(e));
                });
            };
            // 创建用户的返回按钮（取消创建用户）
            $scope.back = function() {
                $state.go('dashboard.config.listUser', {
                    category:$stateParams.category,
                    nid:$stateParams.nid
                });
            }
        }).controller('UserEditController', function($scope,$state,Restangular,$stateParams) {

            $scope.node_name = $stateParams.node_name;

            $scope.save = function () {
                $state.go('dashboard.config.listUser', {
                    category:$stateParams.category,
                    nid:$stateParams.nid
                });
            };

            $scope.back = function() {
                $state.go('dashboard.config.listUser', {
                    category:$stateParams.category,
                    nid:$stateParams.nid
                });
            };
        });
});