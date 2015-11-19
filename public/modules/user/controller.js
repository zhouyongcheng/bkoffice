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
            $scope.node_id = $stateParams.node_id;

            // 查询该节点下的所有用户
            Restangular.one('/user/list/parent_id/'+ $scope.node_id +'/keyword/_/sort/name/order/ASC/skip/_/limit/_').get().then(function(data) {
                $scope.users = data.result;
            });

            $scope.edit = function(_id) {
                $state.go('dashboard.user.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        }).controller('UserAddController', function($scope,$state,Restangular, $stateParams) {
            $scope.category = $stateParams.category;
            $scope.node_id = $stateParams.node_id;

            console.log("**********UserAddController**********");
            console.log("category = "+ $scope.category);
            console.log("node_id = " + $scope.node_id);
            console.log("**********UserAddController**********");

            $scope.user = {
                parentId : $scope.node_id,
                accessibility:'_PUBLIC'
            };
            $scope.create = function() {
                Restangular.all('/user/add').post($scope.user).then(function(user) {
                    if (user) {
                        $state.go('dashboard.'+ $scope.category +'.config.listUser', {category:'distributor', node_id:$scope.node_id});
                    }
                }, function(e) {
                    console.log(JSON.stringify(e));
                });
            };

            $scope.back = function() {
                $state.go('dashboard.'+ $scope.category +'.config.listUser',
                    {category:$scope.category,node_id:$scope.node_id});
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