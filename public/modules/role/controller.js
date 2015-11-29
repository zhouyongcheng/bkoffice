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
        // 角色一览画面机能
        .controller('RoleListController', function($scope,$state,$stateParams,Restangular,localStorageService) {
            var token = localStorageService.get('token');
            Restangular.one('/roles/token/'+ token +'/pid/' + $stateParams.nid).get().then(function (data) {
                // 获取当前登录用户能看到的角色
                $scope.roles = data.result;
            });

            // 给角色添加用户
            $scope.addUser = function(rid, node_id) {
                $state.go('dashboard.'+ $stateParams.category +'.config.roleUser', {
                    role_id:rid,
                    nid:node_id
                });
            };

            // 显示角色的详细情报
            $scope.detail = function(rid, node_id) {

            }
        })
        // 给角色添加用户
        .controller('RoleUserController', function ($scope,$state,$stateParams,Restangular,localStorageService) {

            // 获得当前节点的所有用户
            $scope.users = {
                available : [],
                assigned : [],
                stashed : []
            };
            // 查询该节点下的所有用户
            Restangular.one('/user/list/parent_id/'+ $stateParams.nid +'/keyword/_/sort/name/order/ASC/skip/_/limit/_').get().then(function(data) {
                $scope.users.available = data.result;
            });

            // 获取当前角色的成员列表
            Restangular.one('/role/' + $stateParams.role_id + '/members').get().then(function (data) {
                var members = data.result;
                _.forEach(members, function(u) {
                    $scope.users.assigned.push(u);
                    _.remove($scope.users.available, function(o) {
                        return u._id === o._id;
                    });
                });
            });

            // 分配用户给角色
            $scope.assigin = function() {
                var relation = {
                    ownerId : '',
                    nodeId : $stateParams.role_id
                };
                // 给assigned分配用户
                _.forEach($scope.users.stashed, function(id) {
                    var u = _.find($scope.users.available, {_id:id});
                    relation.ownerId = u._id;
                    Restangular.all('/role/join').post(relation).then(function(data) {
                        $scope.users.assigned.push(u);
                    });
                    _.remove($scope.users.available, function(o) {
                        return o._id === id;
                    });
                });
                $scope.users.stashed = [];
            };

            // 移除角色中的用户
            $scope.revoke = function() {
                var relation = {
                    ownerId : '',
                    nodeId : $stateParams.role_id
                };
                // 把移除的用户添加到可分配的用户列表中
                _.forEach($scope.users.stashed, function(id) {
                    var u = _.find($scope.users.assigned, {_id:id});
                    relation.ownerId = u._id;
                    Restangular.all('/role/leave').post(relation).then(function(data) {
                        $scope.users.available.push(u);
                    });
                    _.remove($scope.users.assigned, function(o) {
                        return o._id === id;
                    });
                });
                $scope.users.stashed = [];
            };
        })
        // 创建角色
        .controller('RoleAddController', function($scope,$state,Restangular,$stateParams,localStorageService, _PERMISSION) {

            // 获取用户登录时的token值
            var token = localStorageService.get('token');

            $scope.role = {
                parentId : $stateParams.nid,
                name:'',           //角色的名称
                type:'',           //角色的类型
                permissions : [],  //最终角色获得的权限
                available : [],    //可分配的权限
                assigned : [],     //已经分配的权限
                stashed:[]         //选择出待分配的权限
            };

            // 获取代理店的详细情报
            Restangular.one("/" + $stateParams.category + "/details", $stateParams.nid).get().then(function(node) {
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
            // 创建角色
            $scope.create = function() {
                var parameters = {
                    parentId: $stateParams.nid,
                    name: $scope.role.name,
                    //type: $scope.role.type,
                    privileges: _.pluck($scope.role.assigned, "code")
                };
                // 创建当前节点下面的角色
                Restangular.all('/role/create/token/' + token).post(parameters).then(function(data) {
                    // 跳转到角色一览画面
                    $state.go('dashboard.config.listRole', {
                        category:$stateParams.category,
                        nid:$stateParams.nid
                    });
                });
            };
            $scope.back = function() {
                $state.go('dashboard.config.listRole', {
                    category:$stateParams.category,
                    nid:$stateParams.nid
                });
            }

        }).controller('RoleEditController', function($scope,$state,Restangular,$stateParams) {
            $scope.save = function () {
                $state.go('dashboard.config.listRole', {
                    category:$stateParams.category,
                    nid:$stateParams.nid
                });
            };

            $scope.back = function() {
                $state.go('dashboard.config.listRole', {
                    category:$stateParams.category,
                    nid:$stateParams.nid
                });
            };
        })
});