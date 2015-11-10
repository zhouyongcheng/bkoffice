/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('outletControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('OutletController', function($scope) {
            $scope.message = '';
        })
        .controller('OutletListController', function($scope,$state,Restangular,localStorageService) {

            Restangular.one('/outlet/list/distributor/56404f4df732d4b30e13ef5b/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                console.log('------------outlet information-----------------');
                console.log(JSON.stringify(data.result));
                console.log('------------outlet information-----------------');
                $scope.outlets = data.result;
            });

            $scope.edit = function(_id) {
                $state.go('outlet.edit', {id:_id});
            }

            $scope.delete = function(_id) {
                Restangular.one('/outlet',_id).remove().then(function() {
                    // delete from front side, avoid query database for new list
                    var r = _.find($scope.outlet, function(o) {
                        return o._id == _id;
                    });
                    var index = $scope.outlet.indexOf(r);
                    if (index > -1) {
                        $scope.outlet.splice(index, 1);
                    }
                });
            }

        }).controller('OutletAddController', function($scope,$state,Restangular) {

            // 创建代理店情报
            $scope.outlet = {
                address : {
                    state : '',
                    city : '',
                    district: ''
                },
                distributorId : ''
            };

            $scope.create = function() {
                Restangular.all('/outlet/create').post($scope.outlet).then(function(data) {
                    console.log("----------create outlet success---------------");
                    console.log(JSON.stringify(data));
                    console.log("-------------------------");
                    $state.go('dashboard.outlet.list');
                }, function(e) {
                    console.log("---------error occurs---------");
                    console.log(JSON.stringify(e));
                    console.log("---------error occurs---------");
                });

            };

            $scope.back = function() {
                $state.go('dashboard.outlet.list');
            }
        }).controller('OutletEditController', function($scope,$state,Restangular,$stateParams) {

            console.log("outlet_id = " + $stateParams.id);

            Restangular.one("/outlet", $stateParams.id).get().then(function(outlet) {
                $scope.outlet = outlet;
            });

            $scope.save = function () {
                $scope.outlet.save().then(function(res) {
                    $scope.message = res.message;
                    $state.transitionTo('outlet.list');
                });
            };

            $scope.back = function() {
                $state.go('outlet.list');
            };
        });
});