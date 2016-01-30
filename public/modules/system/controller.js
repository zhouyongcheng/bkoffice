/**
 * 系统设定功能模块
 */
define(['angular', 'jquery', 'lodash', 'uiRouter','angularLocalStorage', 'atmLogger', 'angularModalService', 'angularFilter'], function(angular,$, _) {
    angular.module('systemControllers', ['restangular','ui.router', 'LocalStorageModule', 'atm.logger', 'angularModalService','angular.filter'])
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
        .controller('systemPermissionController',
            ['$scope', 'Restangular', 'loggerService', '$uibModal',
              function($scope, Restangular, loggerService,$uibModal) {
            // 添加管理分类
            $scope.showAdd = false;
            $scope.validate = [];
            $scope.category = {};

            $scope.toggle = function() {
                $scope.showAdd = !$scope.showAdd;
            };

            // 获取管理类别
            Restangular.one('/system/permission/query').get().then(function(result) {
                loggerService.debug(JSON.stringify(result));
                $scope.entries = result.result;
            });

            // 获取所有的权限条目
            Restangular.one('/system/permission/entry/query').get().then(function(data) {
                loggerService.debug("获取所有的权限条目:result:begin");
                loggerService.debug(JSON.stringify(data));
                loggerService.debug("获取所有的权限条目:result:end");
                $scope.items = data.result;
            });

            /**
             * 添加访问控制的管理类别
             */
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
            };

            /***********************************
             *    添加指定管理分类的访问控制条目     *
             ***********************************/
            $scope.addEntry = function(code, name) {

                loggerService.debug('添加指定管理分类的访问控制条目:begin');
                // 创建modal实例
                $scope.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/system/system.permission.entry.add.html',
                    controller: 'permissionEntryAddController',
                    resolve: {
                        category: function () {
                            return {code:code, name:name};
                        }
                    }
                });

                // 接受modal关闭后的返回值
                $scope.modalInstance.result.then(function (entry) {
                    $scope.items.push(entry);
                    loggerService.info('ok button');
                }, function () {
                    loggerService.info('Modal dismissed at: ' + new Date());
                });
                loggerService.debug('添加指定管理分类的访问控制条目:end');
            };
        }]).controller('permissionEntryAddController', ['$scope','loggerService','Restangular', '$uibModalInstance', 'category',
            function($scope,loggerService,Restangular,$uibModalInstance,category) {

            $scope.entry = {
                category : category,
                code : '',
                name : ''
            };

            // 创建管理资源的访问控制基础条目
            $scope.save = function() {
                loggerService.info("创建管理资源的访问控制基础条目:begin")
                loggerService.debug(JSON.stringify($scope.entry));
                Restangular.all('/system/permission/entry/create').post($scope.entry).then(function(result) {
                    loggerService.debug("创建管理资源的访问控制基础条目结果:begin");
                    loggerService.debug(JSON.stringify(result));
                    loggerService.debug("创建管理资源的访问控制基础条目结果:end");
                    $uibModalInstance.close(result.result);
                }, function (e) {
                    loggerService.log(e);
                });
                loggerService.info("创建管理资源的访问控制基础条目:end");
            };

            //取消，放弃保存
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
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
        .controller('systemRoleAddController', ['$scope','$state','Restangular','loggerService',
            function($scope,$state,Restangular,loggerService) {
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
                loggerService.debug(JSON.stringify($scope.perms));

            });

            $scope.save = function() {
                loggerService.debug("分配的特权");
                loggerService.debug($scope.role.permissions);
                loggerService.debug("分配的特权");
            }
        }])
        // 查询系统用户控制器
        .controller('systemUserListController', ['$scope', 'Restangular', 'loggerService', function($scope, Restangular,loggerService) {
            loggerService.debug("查询系统用户控制器:begin");
            Restangular.one('/user/available').get().then(function (result) {
                $scope.users = result.result;
                loggerService.debug(" ------------ users begin -------------");
                loggerService.debug(JSON.stringify(result.result));
                loggerService.debug(" ------------ users end-------------");
            }, function (e) {
                loggerService.error(e);
            });
        }])
        // 添加系统用户控制器
        .controller('systemUserAddController', ['$scope', 'Restangular', '$state', 'loggerService', function($scope, Restangular, $state, loggerService) {
            $scope.user = {
                accessibility:'_PUBLIC'
            };
            // 创建用户
            $scope.create = function() {
                Restangular.all('/user/add').post($scope.user).then(function(user) {
                    loggerService.debug(JSON.stringify(user));
                    $state.go('dashboard.system.users');
                }, function(e) {
                    loggerService.debug(JSON.stringify(e));
                });
            };

            $scope.back = function () {
                $state.go('dashboard.system.users');
            }
        }])

    });