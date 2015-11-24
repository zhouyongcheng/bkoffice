define(['angular','lodash','uiRouter','angularLocalStorage', 'checklistModel'], function(angular,_) {
    angular.module('roleControllers', ['restangular','ui.router', 'LocalStorageModule', 'checklist-model'])
        .constant(
            "_PERMISSION" , {
                ALL: '全部操作',
                QUERY: '查询',
                MOD: '更新',
                DEL: '禁止',
                ADD: '添加节点',
                ADD_ROLE: '添加角色',
                ADD_BRANCH: '添加下级组织',
                ADD_FORUM: '添加论坛',
                ADD_CUSTOMER: '添加客户',
                RELATION: '关系操作',
                RELATION_JOIN: '加入关系',
                RELATION_JOIN_REQ: '加入请求',
                RELATION_FOLLOW: '关注',
                RELATION_FOLLOW_REQ: '关注请求',
                ENTRY: '条目操作',
                ENTRY_QUERY: '条目查询',
                ENTRY_POST: '发布条目',
                ENTRY_MOD: '条目发布',
                ENTRY_DEL: '条目删除',
                ENTRY_CMT: '条目注释'
            }
        )
        .controller('RoleController', function($scope) {
            $scope.message = '';
        })
        .controller('RoleListController', function($scope,$state,Restangular) {

            $scope.edit = function(_id) {
                $state.go('dashboard.role.edit', {id:_id});
            };

            $scope.delete = function(_id) {

            };

        }).controller('RoleAddController', function($scope,$state,Restangular,$stateParams,_PERMISSION) {

            $scope.role = {
                available : [],
                assigned : [],
                stashed:[]
            };

            // 获取代理店的详细情报
            Restangular.one("/" + $stateParams.category + "/details", $stateParams.node_id).get().then(function(node) {
                $scope.node = node.result;
                _.forEach($scope.node.permission, function(v, k) {
                    if (v === true && _PERMISSION[k]) {
                        $scope.role.available.push({
                            code: k,
                            label: _PERMISSION[k]
                        });
                    }
                })
            });

            // 分配特权
            $scope.assigin = function() {
                // 给assigned分配数据
                _.forEach($scope.role.stashed, function(k) {
                   $scope.role.assigned.push({
                       code: k,
                       label: _PERMISSION[k]
                   });
                });

                // 移除availale的数据
                _.remove($scope.role.available, function(m) {
                    var index = $scope.role.stashed.indexOf(m.code);
                    if (index >= 0) {
                        return true;
                    }
                });
                $scope.role.stashed = [];
            };

            // 取消特权
            $scope.revoke = function() {
                // 给assigned分配数据
                _.forEach($scope.role.stashed, function(k) {
                    $scope.role.available.push({
                        code: k,
                        label: _PERMISSION[k]
                    });
                });

                // 移除availale的数据
                _.remove($scope.role.assigned, function(m) {
                    var index = $scope.role.stashed.indexOf(m.code);
                    if (index >= 0) {
                        return true;
                    }
                });
                $scope.role.stashed = [];
            };

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