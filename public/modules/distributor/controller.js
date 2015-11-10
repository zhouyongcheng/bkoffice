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
                console.log('------------distributor information-----------------');
                console.log(JSON.stringify(data.result));
                console.log('------------distributor information-----------------');
                $scope.distributors = data.result;
            });

            $scope.edit = function(_id) {
                $state.go('distributor.edit', {id:_id});
            }

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

            console.log("distributor_id = " + $stateParams.id);

            Restangular.one("/distributor", $stateParams.id).get().then(function(distributor) {
                $scope.distributor = distributor;
            });

            $scope.save = function () {
                $scope.distributor.save().then(function(res) {
                    $scope.message = res.message;
                    $state.transitionTo('distributor.list');
                });
            };

            $scope.back = function() {
                $state.go('distributor.list');
            };
        });
});