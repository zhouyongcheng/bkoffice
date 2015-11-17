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

        }).controller('RoleAddController', function($scope,$state,Restangular) {

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