/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('distributorControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('DistributorController', function($scope) {
            $scope.message = '';
        })
        .controller('DistributorListController', function($scope,$state,Restangular,localStorageService) {
            Restangular.one('/distributor/list/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                $scope.distributors = data.result;
            });

            $scope.edit = function(_id) {
                $state.go('dashboard.distributor.edit.basic', {id:_id});
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

        }).controller('DistributorAddController', function($scope,$state,Restangular) {

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
        }).controller('DistributorEditController', function($scope,$state,Restangular,$stateParams) {
            // 获取代理店的详细情报
            Restangular.one("/distributor/details", $stateParams.id).get().then(function(distributor) {
                $scope.distributor = distributor.result;
            });

            // 显示代理店的基本情报
            $scope.doBasic = function() {
                $state.go('dashboard.distributor.edit.basic', {id:$scope.distributor._id});
            };

            // 给代理店添加用户
            $scope.doAddUser = function() {
                $state.go('dashboard.user.add', {id:$scope.distributor._id});
            };

            // 给代理店添加角色，角色权限及角色用户
            $scope.doAddRole = function() {
                $state.go('dashboard.role.add', {id:$scope.distributor._id});
            };

            // 设定节点的访问控制
            $scope.doAddPerms = function() {
                $state.go('dashboard.role.add', {id:$scope.distributor._id});
            };

        });
});