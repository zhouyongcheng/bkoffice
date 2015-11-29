/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('userControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('UserController', function($scope) {
            $scope.message = '';
        })
        .controller('UserListController', function($scope,$state,Restangular, $stateParams) {
            // 确定添加用户的节点类型及特定的节点ID
            $scope.category = $stateParams.category;
            $scope.nid = $stateParams.nid;
            $scope.node_name = $stateParams.node_name;

            // 查询该节点下的所有用户
            Restangular.one('/user/list/parent_id/'+ $scope.nid +'/keyword/_/sort/name/order/ASC/skip/_/limit/_').get().then(function(data) {
                $scope.users = data.result;
            });

            $scope.edit = function(_id) {
                $state.go('dashboard.user.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        }).controller('UserAddController', function($scope,$state,Restangular,$stateParams) {
            $scope.node_name = $stateParams.node_name;
            $scope.user = {
                parentId : $stateParams.nid,
                accessibility:'_PUBLIC'
            };
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

            $scope.back = function() {
                $state.go('dashboard.'+ $stateParams.category +'.config.listUser',
                    {category:$stateParams.category,nid:$stateParams.nid});
            }
        }).controller('UserEditController', function($scope,$state,Restangular,$stateParams) {

            $scope.node_name = $stateParams.node_name;

            $scope.save = function () {
                $state.transitionTo('dashboard.user.list');
            };

            $scope.back = function() {
                $state.go('dashboard.user.list');
            };
        });
});