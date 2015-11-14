/**
 * Created by cmwin on 10/23/15.
 */
define(['jquery','angular', 'uiRouter','angularLocalStorage'], function($, angular) {
    angular.module('organizationControllers', ['restangular','ui.router', 'LocalStorageModule', 'treeControl'])
        .controller('OrganizationController', function($scope,$state, Restangular) {
            $(function() {
                //$('#menu').metisMenu();
                $('#menu2').metisMenu({
                    toggle: false
                });
                //$('#menu3').metisMenu({
                //    doubleTapToGo: true
                //});
                //$('#menu4').metisMenu();
            });

            // 获取所有的代理店
            Restangular.one('/distributor/list/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                console.log("*****************step into get distributors********************");
                $scope.distributors = data.result;
                var distributors = data.result;
                $scope.outlets = [];
                distributors.forEach(function(d) {
                    Restangular.one('/outlet/list/distributor', d._id).one('/keyword/_/sort/name/order/ASC/limit/20').get().then(function(data){
                        $scope.outlets[d._id] = data.result;
                        console.log("店ID = " + d._id);
                        console.log("店详细" + JSON.stringify($scope.outlets[d._id]));
                    });
                });
            });

            // 跳转到代理店管理页面
            $scope.goDistributorBoard = function(distributorId) {
                $state.go('dashboard.organization.distributor', {id : distributorId});
            };

            // 跳转到门店管理页面
            $scope.goOutletBoard = function(outletId) {
                $state.go('dashboard.organization.outlet', {id: outletId});
            };
        })
        .controller('OrganizationListController', function($scope, Restangular) {
            // 获取当前用户的节点ID，取得所有的下级节点（不包括子孙节点）
            // 获取当前用户的节点ID
            var parentId = 'anjia';

            // 取得所有的下级节点,节点类型为tenants
            Restangular.one('/tenants').get().then(function(data) {
                if (data) {
                    var tenants = data.result;
                    $scope.tenants = tenants;
                    $scope.treedata = [];
                    for (var i in tenants) {
                        console.log('-------------selected node--------------');
                        console.log(JSON.stringify(tenants[i]));
                        console.log('-------------selected node--------------');
                        $scope.treedata.push({
                            code : tenants[i]._id,
                            label : tenants[i].shortName,
                            type : 'folder',
                            category : 'tenant'
                        });
                    }
                }

            });

            //$scope.treedata= [
            //    {code:'1', label: "安家中国", type: "folder", children: [
            //        {code:'1.1', label: "大连代理店", type: "folder", children : [
            //            {code:'1.1.1' ,label: "黑石礁店", type: "pic"},
            //            {code:'1.1.2',label: "数码店", type: "pic"},
            //            {code:'1.1.3',label: "青泥哇店", type: "pic"}
            //        ]},
            //        {label: "长春代理店", type: "folder",children : [
            //            {label: "黑石礁店", type: "doc"},
            //            {label: "数码店", type: "doc"},
            //            {label: "青泥哇店", type: "doc"}
            //        ]},
            //        {label: "太原代理店", type: "folder", children:[]},
            //        {label: "南京代理店", type: "file"},
            //        {label: "广州代理店", type: "movie"}
            //    ]}
            //];

            // 检索对应的子节点
            $scope.showSelected = function(sel) {
                $scope.selectedNode = sel;
                var id = sel.code;
                console.log("distributorId = " + id);
                var category = sel.category;

                if (category === 'tenant') {
                    // 检索出对应的门店情报
                    Restangular.one('/outlet/list/distributor', id).one('/keyword/_/sort/name/order/ASC/limit/20').get().then(function(data) {
                        if (data) {
                            var tenants = data.result;
                            var children = [];
                            for (var i in tenants) {
                                children.push({code : tenants[i]._id,
                                    label : tenants[i].shortName,
                                    type : 'folder',
                                    category : 'outlet'});
                            }
                            sel.children = children;
                        }
                    });
                }

                console.log('-------------selected node--------------');
                console.log(JSON.stringify(sel));
                console.log('-------------selected node--------------');
            };




        }).controller('OrganizationAddController', function($scope,$state,Restangular) {
            // 添加组织机构情报
            $scope.create = function() {
                $state.go('dashboard.organization.list');
            };

            $scope.back = function() {
                $state.go('dashboard.organization.list');
            }
        })
        // 代理店管理控制模块
        .controller('OrganizationDistributorController', function($scope, Restangular, $stateParams) {
            var distributor = $stateParams.id;
            Restangular.one('/outlet/list/distributor', $stateParams.id).one('/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                $scope.outlets = data.result;
            });
        })
        // 门店管理控制模块
        .controller('OrganizationOutletController', function($scope, Restangular) {

        })
        .controller('OrganizationEditController', function($scope,$state,Restangular,$stateParams) {
            $scope.save = function () {
                $state.transitionTo('dashboard.organization.list');
            };

            $scope.back = function() {
                $state.go('dashboard.organization.list');
            };
        });
});