/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('distributorControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('distributorController', function($scope) {
            $scope.message = '';
        })
        .controller('distributorListController', function($scope,$state,Restangular) {

            Restangular.one('/distributor/list/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                $scope.distributors = data.result;
            });

            $scope.edit = function(_id) {
                console.log("distributor node_id = " + _id);
                $state.go('dashboard.config.basic', {
                    nid:_id,
                    category:'distributor'
                });
            };

            $scope.delete = function(_id) {
                Restangular.one('/distributor',_id).remove().then(function() {
                    // delete from front side, avoid query database for new list
                    var r = _.find($scope.distributor, function(o) {
                        return o._id == _id;
                    });
                    var index = $scope.distributor.indexOf(r);
                    if (index > -1) {
                        $scope.distributor.splice(index, 1);
                    }
                });
            }

        }).controller('distributorAddController', function($scope,$state,Restangular) {

            //服务商列表取得
            Restangular.one('/services').get().then(function(data){
                $scope.services = data.result;
            });

            // 创建代理店情报
            $scope.distributor = {
                serviceCode:'anjia'
            };

            $scope.create = function() {
                Restangular.all('/distributor/create').post($scope.distributor).then(function(data) {
                    console.log("----------create distributor success---------------");
                    console.log(JSON.stringify(data));
                    console.log("-------------------------");
                    $state.go('dashboard.distributor.list');
                }, function(e) {
                    console.log("---------error occurs---------");
                    console.log(JSON.stringify(e));
                    console.log("---------error occurs---------");
                });

            };

            $scope.back = function() {
                $state.go('dashboard.distributor.list');
            }
        }).controller('distributorEditController', function($scope,$state,Restangular,$stateParams) {

            //// 获取当前节点的权限数据
            //Restangular.one("/permission/get/node", $stateParams.id).get().then(function(permissions) {
            //    $scope.permissions = permissions
            //    console.log("distributor permissions xxx = " + JSON.stringify(permissions));
            //});


            // 获取代理店的详细情报
            Restangular.one("/distributor/details", $stateParams.nid).get().then(function(distributor) {
                $scope.distributor = distributor.result;
                $scope.node = $scope.distributor;
            });

            // 显示代理店的基本情报
            $scope.doBasic = function() {
                $state.go('dashboard.config.basic',{
                    category:'distributor',
                    nid:$scope.distributor._id,
                    node_name:$scope.distributor.name
                });
            };

            // 代理店用户一览
            $scope.listUser = function() {
                $state.go('dashboard.config.listUser', {
                    category:'distributor',
                    nid:$scope.distributor._id,
                    node_name:$scope.distributor.name
                });
            };

            // 代理店用户添加
            $scope.addUser = function() {
                $state.go('dashboard.config.addUser', {
                    category:'distributor',
                    nid:$scope.distributor._id,
                    node_name:$scope.distributor.name
                });
            };

            // 代理店的角色一览
            $scope.listRole = function() {
                $state.go('dashboard.config.listRole', {
                    category:'distributor',
                    nid:$scope.distributor._id,
                    node_name:$scope.distributor.name
                });
            };

            // 给代理店添加角色
            $scope.addRole = function() {
                $state.go('dashboard.config.addRole', {
                    category:'distributor',
                    nid:$scope.distributor._id,
                    node_name:$scope.distributor.name
                });
            };

            $scope.settingPermission = function() {
                $state.go('dashboard.config.permission', {
                    category:'distributor',
                    nid:$scope.distributor._id,
                    node_name:$scope.distributor.name
                });
            }
        });
});