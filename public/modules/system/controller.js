/**
 * 系统设定功能模块
 */
define(['angular', 'jquery', 'lodash', 'uiRouter','angularLocalStorage', 'atmLogger'], function(angular,$, _) {
    angular.module('systemControllers', ['restangular','ui.router', 'LocalStorageModule', 'atm.logger'])
        .controller('systemController', function($scope) {
            $('#system_sidebar').metisMenu({
                toggle: true
            });
        })
        // 系统设定
        .controller('systemListController', function($scope,$state,Restangular) {
            $('#system_sidebar').metisMenu({
                toggle: true
            });
        })
        // 系统设定
        .controller('systemAddController', function($scope,$state,Restangular) {
            
        })
        // 系统设定
        .controller('systemEditController', function($scope,$state,Restangular,$stateParams) {
            
        })
        // 系统设定
        .controller('systemPermsListController', function($scope,$state,Restangular,$stateParams) {
            Restangular.one('/perms/all').get().then(function(data) {
                $scope.perms = data.result;
            });
            // 编辑特定的访问控制项目
            $scope.edit = function(id) {
                $state.go('dashboard.system.permsedit', {perm_id:id});
            }
        })
        // 系统资源访问控制:基本访问控制设定一览
        .controller('systemPermissionController', ['$scope', 'Restangular', 'loggerService',  function($scope, Restangular, loggerService) {
            // 添加管理分类
            $scope.showAdd = false;
            $scope.validate = [];
            $scope.category = {};

            $scope.toggle = function() {
                $scope.showAdd = !$scope.showAdd;
            };

            Restangular.one('/system/permission/query').get().then(function(result) {
                loggerService.debug(JSON.stringify(result));
                $scope.entries = result.result;
            });

            $scope.addCategory = function() {
                $scope.validate = [];
                if (_.size($scope.category.code) <= 0) {
                    $scope.validate.push('分类编码必须输入');
                }
                if (_.size($scope.category.name) <= 0) {
                    $scope.validate.push('分类名称必须输入');
                }
                if (_.size($scope.validate) > 0) {
                    return;
                }
                // 保存当前的管理类别
                Restangular.all('/system/permission/create').post($scope.category).then(function(result) {
                    loggerService.debug(JSON.stringify(result));
                });

                loggerService.debug("finished calling addCategory:success");
            }
        }])
        // 基础访问控制添加系统设定
        .controller('systemPermsController', function($scope,$state,Restangular,$stateParams) {
            $scope.save = function () {
                Restangular.all('/perms/create').post($scope.perm).then(function(data) {
                    $state.go('dashboard.system.permslist');
                });
            }
        })
        // 对访问控制特权进行编辑
        .controller('systemPermsEditController', function($scope,$state,Restangular,$stateParams) {
            Restangular.one('/perms/detail/', $stateParams.perm_id).get().then(function(data) {
                $scope.perm = data.result;
            });

            $scope.save = function() {
                Restangular.all('/perms/update').post($scope.perm).then(function(data) {
                    $state.go('dashboard.system.permslist');
                });
            }
        })
        // 系统添加角色机能
        .controller('systemRoleAddController', function($scope,$state,Restangular,$stateParams) {
            // 如该是super用户，获取所有的访问控制权限
            // 如该不是super用户，获取该用户的所有可用权限
            $scope.categories = [
                {code:'distributor', label:'加盟商'},
                {code:'outlet', label:'门店'},
                {code:'developer', label:'开发商'},
                {code:'pmc', label:'物业公司'}
            ];

            $scope.role = {
                permissions : []
            };
            Restangular.one('/perms/all').get().then(function(data) {
                var permissions = data.result;
                $scope.perms = _.groupBy(permissions, 'categoryName')
                console.log(JSON.stringify($scope.perms));

            });

            $scope.save = function() {
                console.log("分配的特权");
                console.log($scope.role.permissions);
                console.log("分配的特权");
            }
        })

    });