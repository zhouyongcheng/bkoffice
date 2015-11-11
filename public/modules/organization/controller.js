/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'uiRouter','angularLocalStorage'], function(angular) {
    angular.module('organizationControllers', ['restangular','ui.router', 'LocalStorageModule', 'treeControl'])
        .controller('OrganizationController', function($scope) {
            $scope.message = '';
        })
        .controller('OrganizationListController', function($scope) {

            $scope.treedata= [
                {label: "安家中国", type: "folder", children: [
                    {label: "大连代理店", type: "folder", children : [
                        {label: "黑石礁店", type: "pic"},
                        {label: "数码店", type: "pic"},
                        {label: "青泥哇店", type: "pic"}
                    ]},
                    {label: "长春代理店", type: "folder",children : [
                        {label: "黑石礁店", type: "doc"},
                        {label: "数码店", type: "doc"},
                        {label: "青泥哇店", type: "doc"}
                    ]},
                    {label: "太原代理店", type: "doc"},
                    {label: "南京代理店", type: "file"},
                    {label: "广州代理店", type: "movie"}
                ]}
            ];
            $scope.showSelected = function(sel) {
                $scope.selectedNode = sel;
            };




        }).controller('OrganizationAddController', function($scope,$state,Restangular) {
            // 添加组织机构情报
            $scope.create = function() {
                $state.go('dashboard.organization.list');
            };

            $scope.back = function() {
                $state.go('dashboard.organization.list');
            }
        }).controller('OrganizationEditController', function($scope,$state,Restangular,$stateParams) {
            $scope.save = function () {
                $state.transitionTo('dashboard.organization.list');
            };

            $scope.back = function() {
                $state.go('dashboard.organization.list');
            };
        });
});