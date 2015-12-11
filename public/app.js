define([
    'angular',
    'uiRouter',
    'fileUploadShim',
    'fileUpload',
    'restangular',
    'angularJwt',
    'angularLocalStorage',
    'ngFileUpload',
    'loginModule',
    'dashboardModule',
    'userModule',
    'roleModule',
    'organizationModule',
    'serviceModule',
    'distributorModule',
    'developerModule',
    'outletModule',
    'realtorModule',
    'masterModule',
    'brokerModule',
    'buyingModule',
    'sellingModule',
    'repositoryModule',
    'allianceModule',
    'masterModule',
    'projectModule',
    'systemModule',
    'uploadModule'
], function(angular) {
    return angular.module('portal',
        ['ui.router',
         'ui.bootstrap',
         'ngFileUpload',
         'restangular',
         'angular-jwt',
         'LocalStorageModule',
         'loginModule',
         'dashboardModule',
         'userModule',
         'roleModule',
         'organizationModule',
         'serviceModule',
         'distributorModule',
         'developerModule',
         'outletModule',
         'realtorModule',
         'masterModule',
         'projectModule',
         'brokerModule',
         'buyingModule',
         'sellingModule',
         'repositoryModule',
         'allianceModule',
         'systemModule',
         'uploadModule'
        ])
        .factory('sessionInjector', function(localStorageService) {
            var sessionInjector = {
                request: function(config) {
                    var token = localStorageService.get('token');
                    if (token) {
                        config.headers['X-Access-Token'] = token;
                    }
                    return config;
                }
            };
            return sessionInjector;
        })
        .config(['$urlRouterProvider','$stateProvider','$httpProvider','RestangularProvider','jwtInterceptorProvider','localStorageServiceProvider',function($urlRouterProvider, $stateProvider,$httpProvider,RestangularProvider,jwtInterceptorProvider, localStorageServiceProvider) {
            RestangularProvider.setBaseUrl("http://192.168.0.103:3041/");
            localStorageServiceProvider.setPrefix('portal').setNotify(true, true);
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push('sessionInjector');
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                // 登录机能
                .state('login', {
                    url: '/login',
                    templateUrl: 'modules/login/login.html',
                    controller : 'LoginController'
                })
                // 主控面板
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'modules/dashboard/dashboard.html',
                    controller : 'DashboardController'
                })
            /**************************
             *     系统设置管理模块       *
             **************************/
                .state('dashboard.system', {
                    url:'/system',
                    views : {
                        sidebar: {
                            templateUrl: 'modules/system/sidebar.html'
                        }
                    }
                })
                // 用户一览机能
                .state('dashboard.system.users', {
                    url:'/users',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.users.html'
                        }
                    }
                })
                // 添加用户
                .state('dashboard.system.adduser', {
                    url:'/useradd',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.useradd.html'
                        }
                    }
                })
                // 角色一览机能
                .state('dashboard.system.roles', {
                    url:'/roles',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.roles.html'
                        }
                    }
                })
                // 添加角色
                .state('dashboard.system.roleadd', {
                    url:'/roleadd',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.roleadd.html',
                            controller: 'systemRoleAddController'
                        }
                    }
                })
                // 添加访问控制限制基本配置
                .state('dashboard.system.permslist', {
                    url:'/permslist',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.permslist.html',
                            controller: 'systemPermsListController'
                        }
                    }
                })
                // 添加访问控制限制基本配置
                .state('dashboard.system.permsadd', {
                    url:'/permsadd',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.permsadd.html',
                            controller: 'systemPermsController'
                        }
                    }
                })
                // 编辑访问控制限制基本配置
                .state('dashboard.system.permsedit', {
                    url:'/permsedit/:perm_id',
                    views : {
                        'content@dashboard': {
                            templateUrl: 'modules/system/system.permsedit.html',
                            controller: 'systemPermsEditController'
                        }
                    }
                })

                // 显示各个节点的基本情报基本设定[共通机能]
                // 设置dashboard的sidebar共通导航菜单
                // 菜单根据传入的category和node_id，动态的分配controller和context的template内容
                .state('dashboard.config', {
                    url:'/config/:category/:nid',
                    views : {
                        sidebar: {
                            templateUrl: 'modules/dashboard/sidebar.html',
                            controllerProvider: function ($stateParams) {
                                var ctrlName = $stateParams.category + "EditController";
                                return ctrlName;
                            }
                        }
                    }
                })
                // 根据category动态选择content的view模板
                // 根据category动态选择模板对应的controller
                .state('dashboard.config.basic', {
                    url: '/basic/:node_name',
                    views : {
                        'content@dashboard' : {
                            templateUrl: function($stateParams) {
                                return 'modules/'+ $stateParams.category +'/'+ $stateParams.category +'.basic.html'
                            },
                            controllerProvider: function($stateParams) {
                                var ctrlName = $stateParams.category + "EditController";
                                return ctrlName;
                            }
                        }
                    }
                })
                // 用户一栏机能
                .state('dashboard.config.listUser', {
                    url:'/user/list/:node_name',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/user/user.list.html',
                            controller: 'UserListController'
                        }
                    }
                })

                // 节点上添加用户
                .state('dashboard.config.addUser', {
                    url:'/user/add/:node_name',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/user/user.add.html',
                            controller: 'UserAddController'
                        }
                    }
                })
                // 节点的角色一栏机能
                .state('dashboard.config.listRole', {
                    url:'/role/list/:node_name',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/role/role.list.html',
                            controller: 'RoleListController'
                        }
                    }
                })
                // 节点上添加角色
                .state('dashboard.config.addRole', {
                    url:'/role/add/:node_name',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/role/role.add.html',
                            controller: 'RoleAddController'
                        }
                    }
                })
                // 给角色添加用户
                .state('dashboard.config.roleUser', {
                    url:'/role/:role_id/node/:nid/:category',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/role/role.user.html',
                            controller: 'RoleUserController'
                        }
                    }
                })
                // 显示角色的详细情报
                .state('dashboard.config.roleDetails', {
                    url:'/role/:role_id/:category',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/role/role.details.html',
                            controller: 'RoleDetailsController'
                        }
                    }
                })
                /**************************
                 *     代理店管理模块       *
                 **************************/
                .state('dashboard.distributor', {
                    url: '/distributor',
                    views : {
                        sidebar: {
                            template: '<div ui-view="sub_sidebar"></div>'
                        },
                        content: {
                            template: '<div ui-view="sub_content"></div>'
                        }
                    }
                })
                // 代理店一览机能
                .state('dashboard.distributor.list', {
                    url: '/list',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/distributor/distributor.list.html',
                            controller: 'distributorListController'
                        }
                    }
                })
                // 创建代理店
                .state('dashboard.distributor.add', {
                    url: '/add',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/distributor/distributor.add.html',
                            controller: 'distributorAddController'
                        }
                    }
                })
            /**************************
             *     门店管理模块       *
             **************************/
                .state('dashboard.outlet', {
                    url: '/outlet',
                    views : {
                        sidebar: {
                            template: '<div ui-view="sub_sidebar"></div>'
                        },
                        content: {
                            template: '<div ui-view="sub_content"></div>'
                        }
                    }
                })
                // 门店一览机能
                .state('dashboard.outlet.list', {
                    url: '/list',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/outlet/outlet.list.html',
                            controller: 'outletListController'
                        }
                    }
                })
                // 创建门店
                .state('dashboard.outlet.add', {
                    url: '/add',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/outlet/outlet.add.html',
                            controller: 'outletAddController'
                        }
                    }
                })

            /**************************
             *     楼盘管理模块       *
             **************************/
                .state('dashboard.project', {
                    url: '/project',
                    views : {
                        sidebar: {
                            template: '<div ui-view="sub_sidebar"></div>'
                        },
                        content: {
                            template: '<div ui-view="sub_content"></div>'
                        }
                    }
                })
                // 楼盘一览机能
                .state('dashboard.project.list', {
                    url: '/list',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/project/project.list.html',
                            controller: 'projectListController'
                        }
                    }
                })
                // 创建楼盘
                .state('dashboard.project.add', {
                    url: '/add',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/project/project.add.html',
                            controller: 'projectAddController'
                        }
                    }
                })
            /**************************
             *     开发商管理模块       *
             **************************/
                .state('dashboard.developer', {
                    url: '/developer',
                    views : {
                        sidebar: {
                            template: '<div ui-view="sub_sidebar"></div>'
                        },
                        content: {
                            template: '<div ui-view="sub_content"></div>'
                        }
                    }
                })
                .state('dashboard.developer.list', {
                    url: '/list',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/developer/developer.list.html',
                            controller: 'developerListController'
                        }
                    }
                })
                // 创建开发商
                .state('dashboard.developer.add', {
                    url: '/add',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/developer/developer.add.html',
                            controller: 'developerAddController'
                        }
                    }
                })
            /**************************
             *     代理店管理模块       *
             **************************/
                .state('dashboard.broker', {
                    url: '/broker',
                    views : {
                        sidebar: {
                            template: '<div ui-view="sub_sidebar"></div>'
                        },
                        content: {
                            template: '<div ui-view="sub_content"></div>'
                        }
                    }
                })
                // 经纪人一览机能
                .state('dashboard.broker.list', {
                    url: '/list',
                    views : {
                        sub_content: {
                            templateUrl: 'modules/broker/broker.list.html',
                            controller: 'brokerListController'
                        }
                    }
                })
                //// 创建经纪人
                //.state('dashboard.developer.add', {
                //    url: '/add',
                //    views : {
                //        sub_content: {
                //            templateUrl: 'modules/developer/developer.add.html',
                //            controller: 'developerAddController'
                //        }
                //    }
                //})

                //.state('dashboard.user.list', {
                //    url: '^dashboard/user/list',
                //    views : {
                //        sidebar: {
                //            templateUrl: 'modules/distributor/developer.sidebar.html',
                //            controller: 'DistributorEditController'
                //        },
                //        content: {
                //            templateUrl: 'modules/user/user.list.html',
                //            controller: 'UserListController'
                //        }
                //    }
                //})
                //.state('dashboard.user.add', {
                //    url: '^/user/add',
                //    templateUrl: 'modules/user/user.list.html',
                //    controller: 'UserListController'
                //})

                //// 组织机构机能管理
                //.state('dashboard.organization', {
                //    url: '/organization',
                //    views : {
                //        'sidebar' : {
                //            controller:'OrganizationController',
                //            templateUrl: 'modules/organization/sidebar.html'
                //        },
                //        'content' : {
                //            template: '<ui-view />'
                //        }
                //    }
                //}).state('dashboard.organization.list', {
                //    url: '/list',
                //    templateUrl: 'modules/organization/organization.list.html',
                //    controller: 'OrganizationListController'
                //})
                //// 代理店管理机能
                //.state('dashboard.organization.developer', {
                //    url: '/distributor/:id',
                //    templateUrl: 'modules/organization/organization.distributor.html',
                //    controller: 'OrganizationDistributorController'
                //})
                //// 门店管理机能
                //.state('dashboard.organization.outlet', {
                //    url: '/outlet/:id',
                //    templateUrl: 'modules/organization/organization.outlet.html',
                //    controller: 'OrganizationOutletController'
                //})
                //.state('dashboard.organization.edit', {
                //    url: '/edit/:id',
                //    templateUrl: 'modules/organization/organization.edit.html',
                //    controller: 'OrganizationEditController'
                //}).state('dashboard.organization.add', {
                //    url: '/add',
                //    templateUrl: 'modules/organization/organization.add.html',
                //    controller: 'OrganizationAddController'
                //})
                //// 服务商管理机能
                //.state('dashboard.service', {
                //    url: '/service',
                //    abstract: true,
                //    template: '<ui-view />'
                //}).state('dashboard.service.list', {
                //    url: '/list',
                //    templateUrl: 'modules/service/service.list.html',
                //    controller: 'ServiceListController'
                //}).state('dashboard.service.edit', {
                //    url: '/edit/:id',
                //    templateUrl: 'modules/service/service.edit.html',
                //    controller: 'ServiceEditController'
                //}).state('dashboard.service.add', {
                //    url: '/add',
                //    templateUrl: 'modules/service/service.add.html',
                //    controller: 'ServiceAddController'
                //})



                //// 门店管理机能
                //.state('dashboard.outlet', {
                //    url: '/outlet',
                //    abstract: true,
                //    template: '<ui-view />'
                //}).state('dashboard.outlet.list', {
                //    url: '/list',
                //    templateUrl: 'modules/outlet/outlet.list.html',
                //    controller: 'OutletListController'
                //}).state('dashboard.outlet.edit', {
                //    url: '/edit/:id',
                //    templateUrl: 'modules/outlet/outlet.edit.html',
                //    controller: 'OutletEditController'
                //}).state('dashboard.outlet.add', {
                //        url: '/add',
                //        templateUrl: 'modules/outlet/outlet.add.html',
                //        controller: 'OutletAddController'
                //})
                //// 用户管理机能
                //.state('dashboard.user', {
                //    url: '/user'
                //}).state('dashboard.user.list', {
                //    url: '/list',
                //    views : {
                //        'content@dashboard': {
                //            templateUrl: 'modules/user/user.list.html',
                //            controller: 'UserListController'
                //        }
                //    }
                //}).state('dashboard.user.edit', {
                //    url: '/edit/:id',
                //    templateUrl: 'modules/user/user.edit.html',
                //    controller: 'UserEditController'
                //}).state('dashboard.user.add', {
                //    url: '/add',
                //    templateUrl: 'modules/user/user.add.html',
                //    controller: 'UserAddController'
                //})
                //
                //// 角色管理机能
                //.state('dashboard.role', {
                //    url:'/role',
                //    views : {
                //        'sidebar': {
                //            templateUrl: 'modules/role/role.sidebar.html'
                //        },
                //        'content' : {
                //            abstract: true,
                //            template: '<ui-view />'
                //        }
                //    }
                //}).state('dashboard.role.list', {
                //    url: '/list',
                //    templateUrl: 'modules/role/role.list.html',
                //    controller: 'RoleListController'
                //}).state('dashboard.role.edit', {
                //    url: '/edit/:id',
                //    templateUrl: 'modules/role/role.edit.html',
                //    controller: 'RoleEditController'
                //}).state('dashboard.role.add', {
                //    url: '/add',
                //    templateUrl: 'modules/role/role.add.html',
                //    controller: 'RoleAddController'
                //}).state('dashboard.role.select', {
                //    url: '/select',
                //    templateUrl: 'modules/role/role.select.html',
                //    controller: 'RoleMultiController'
                //}).state('dashboard.role.tabset', {
                //    url: '/tabset',
                //    templateUrl: 'modules/role/role.tabs.html',
                //    controller: 'RoleTabsController'
                //})
                //
                //// 经纪人管理机能
                //.state('dashboard.realtor', {
                //    url: '/realtor',
                //    abstract: true,
                //    template: '<ui-view />'
                //}).state('dashboard.realtor.list', {
                //    url: '/list',
                //    templateUrl: 'modules/realtor/realtor.list.html',
                //    controller: 'RealtorListController'
                //}).state('dashboard.realtor.edit', {
                //    url: '/edit/:id',
                //    templateUrl: 'modules/realtor/realtor.edit.html',
                //    controller: 'RealtorEditController'
                //}).state('dashboard.realtor.add', {
                //    url: '/add',
                //    templateUrl: 'modules/realtor/realtor.add.html',
                //    controller: 'RealtorAddController'
                //})
                //// 文件上传功能
                //.state('upload', {
                //    url: '/upload',
                //    templateUrl: 'modules/upload/upload.html',
                //    controller: 'UploadController'
                //}).state('master', {
                //    url: '/master',
                //    templateUrl: 'modules/master/master.html',
                //    controller: 'MasterController'
                //}).state('master.list', {
                //    resolve : {
                //        categories : function(Restangular) {
                //            return Restangular.all('/api/categories').getList().$object;
                //        }
                //    },
                //    url: '/list',
                //    templateUrl: 'modules/master/list.html',
                //    controller: 'MasterListController'
                //}).state('master.create', {
                //    url: '/create',
                //    templateUrl: 'modules/master/create.html',
                //    controller: 'MasterCreateController'
                //}).state('master.update', {
                //    url: '/update/:category/:code',
                //    templateUrl: 'modules/master/update.html',
                //    controller: 'MasterUpdateController'
                //}).state('broker', {
                //    url: '/broker',
                //    templateUrl: 'modules/broker/broker.html'
                //}).state('buying', {
                //    url: '/buying',
                //    templateUrl: 'modules/buying/buying.html',
                //    controller: 'BuyingController'
                //}).state('selling', {
                //    url: '/selling',
                //    templateUrl: 'modules/selling/selling.html',
                //    controller : 'SellingController'
                //}).state('repository', {
                //    url: '/repository',
                //    templateUrl: 'modules/repository/repository.html'
                //}).state('alliance', {
                //    url: '/alliance',
                //    templateUrl: 'modules/alliance/alliance.html',
                //    controller : 'AllianceController'
                //}).state('projects', {
                //    url: '/projects',
                //    templateUrl : 'modules/project/projects.html'
                //}).state('projects.detail', {
                //    views : {
                //        'filters' : {
                //            templateUrl : 'modules/project/filters.html'
                //        },
                //        'menu' : {
                //            templateUrl : 'modules/project/menu.html'
                //        },
                //        'content' : {
                //            templateUrl:'modules/project/content.html'
                //        }
                //    }
                //}).state('projects.list', {
                //    url:'/list',
                //    //templateUrl:'modules/project/projects.list.html',
                //    views : {
                //        'filters' : {
                //            templateUrl : 'modules/project/filters.html'
                //        },
                //        'menu' : {
                //            templateUrl : 'modules/project/menu.html'
                //        },
                //        'content' : {
                //            templateUrl:'modules/project/content.html'
                //        }
                //    }
                //}).state('projects.add', {
                //    url:'/add',
                //    //templateUrl:'modules/project/projects.add.html',
                //    views : {
                //        'filters' : {
                //            templateUrl : 'modules/project/filters.html'
                //        },
                //        'menu' : {
                //            templateUrl : 'modules/project/menu.html'
                //        },
                //        'content' : {
                //            templateUrl:'modules/project/content.html'
                //        }
                //    }
                //})
                //// 给代理店添加成员，角色及访问控制的等情报
                //.state('dashboard.distributor.config', {
                //    url: '/:id/config',
                //    views : {
                //        'sub_sidebar': {
                //            templateUrl: 'modules/distributor/distributor.sidebar.html',
                //            controller: 'DistributorEditController'
                //        },
                //        'sub_content' : {
                //            template : '<div ui-view=""></div>'
                //        }
                //    }
                //})
                //// 显示代理店的基本情报
                //.state('dashboard.distributor.config.basic', {
                //    url: '/basic',
                //    templateUrl: 'modules/distributor/distributor.basic.html',
                //    controller: 'DistributorEditController'
                //})
                //// 设定代理店的访问控制情报
                //.state('dashboard.distributor.config.permission', {
                //    url: '/permission',
                //    templateUrl: 'modules/distributor/distributor.permission.html',
                //    controller: 'DistributorEditController'
                //})
                //
                //// 用户一栏机能
                //.state('dashboard.distributor.config.listUser', {
                //    url:'/user/:category/:nid/list',
                //    templateUrl: 'modules/user/user.list.html',
                //    controller: 'UserListController'
                //})
                //
                //// 节点上添加用户
                //.state('dashboard.distributor.config.addUser', {
                //    url:'/user/:category/:nid/add',
                //    templateUrl: 'modules/user/user.add.html',
                //    controller: 'UserAddController'
                //})
                //// 节点的角色一栏机能
                //.state('dashboard.distributor.config.listRole', {
                //    url:'/role/:category/:nid/list',
                //    templateUrl: 'modules/role/role.list.html',
                //    controller: 'RoleListController'
                //})
                //
                //// 节点上添加角色
                //.state('dashboard.distributor.config.addRole', {
                //    url:'/role/:category/:nid/add',
                //    templateUrl: 'modules/role/role.add.html',
                //    controller: 'RoleAddController'
                //})
                //// 给角色添加用户
                //.state('dashboard.distributor.config.roleUser', {
                //    url:'/role/:role_id/node/:nid',
                //    templateUrl: 'modules/role/role.user.html',
                //    controller: 'RoleUserController'
                //})
            ;
            }]);
});