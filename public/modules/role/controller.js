define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('roleControllers', ['restangular','ui.router', 'LocalStorageModule'])
        .controller('RoleController', function($scope) {
            $scope.message = '';
        })
        .controller('RoleListController', function($scope,$state,Restangular) {

            $scope.edit = function(_id) {
                $state.go('dashboard.role.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        }).controller('RoleAddController', function($scope,$state,Restangular, $stateParams) {

            // 获取代理店的详细情报
            Restangular.one("/" + $stateParams.category + "/details", $stateParams.node_id).get().then(function(node) {
                $scope.node = node.result;
            });

            // 获取节点的permission情报
            Restangular.one("/permission/get/node", $stateParams.node_id).get().then(function(permissions) {
                $scope.permissions = [];

                var perms = permissions.result;

                console.log("-------------------------------------------------");

                console.log("permissions = " + JSON.stringify(perms));



                var CKS = {
                    'ALL' : {key:'ALL', value:'所有权限'},
                    'QUERY' : {key:'QUERY', value :'查看权限'},
                    'MOD': {key:'MOD', value:'更新权限'}
                };


                if (perms['ALL'].length > 0) {
                    console.log("all");
                    for (var p in perms) {
                        if (CKS[p] != null) {
                            $scope.permissions.push(CKS[p]);
                        }
                    }
                } else {
                    console.log("single");
                    for (var p in perms) {
                        if (perms[p].length > 0 && CKS[p] != null) {
                            $scope.permissions.push(CKS[p]);
                        }
                    }
                }
                console.log(JSON.stringify($scope.permissions));
                console.log("-------------------------------------------------");

            });


            $scope.role = {};

            $scope.create = function() {

            };

            $scope.back = function() {
                $state.go('dashboard.role.list');
            }
        }).controller('RoleEditController', function($scope,$state,Restangular,$stateParams) {
            $scope.save = function () {
                $state.transitionTo('dashboard.role.list');
            };

            $scope.back = function() {
                $state.go('dashboard.role.list');
            };
        }).controller('RoleMultiController', function($scope) {

            $scope.modernBrowsers = [
                { icon: "<img src=[..]/opera.png.. />",               name: "全部操作", maker: "(对节点的全部操作)",        ticked: true  },
                { icon: "<img src=[..]/internet_explorer.png.. />",   name: "更新",    maker: "(更新节点的操作)",             ticked: false },
                { icon: "<img src=[..]/firefox-icon.png.. />",        name: "删除",    maker: "(删除节点的操作)",    ticked: true  },
                { icon: "<img src=[..]/safari_browser.png.. />",      name: "查询",    maker: "(查询节点详细的操作)",                 ticked: false },
                { icon: "<img src=[..]/chrome.png.. />",              name: "添加",    maker: "(添加子节点的操作)",                ticked: true  }
            ];

        }).controller('RoleTabsController', function() {
            $scope.tabs = [
                { title:'Dynamic Title 1', content:'Dynamic content 1' },
                { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
            ];

            $scope.alertMe = function() {
                setTimeout(function() {
                    $window.alert('You\'ve selected the alert tab!');
                });
            };
        });
});