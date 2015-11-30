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
            RestangularProvider.setBaseUrl("http://192.168.0.47:3041/");
            localStorageServiceProvider.setPrefix('portal').setNotify(true, true);
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push('sessionInjector');
            $urlRouterProvider.otherwise('/login');

            // for test only add begin
            //RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
            //    console.log("calling restangular request intercept begin");
            //    console.log("element = " + JSON.stringify(element));
            //    console.log("calling restangular request intercept end");
            //    return element;
            //});
            // for test only add end

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
                // 显示各个节点的基本情报基本设定[共通机能]
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
                // 显示各个节点的基本情报
                .state('dashboard.config.basic', {
                    url: '/basic',
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
                    url:'/user/:category/:nid/list',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/user/user.list.html',
                            controller: 'UserListController'
                        }
                    }
                })

                // 节点上添加用户
                .state('dashboard.config.addUser', {
                    url:'/user/:category/:nid/add',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/user/user.add.html',
                            controller: 'UserAddController'
                        }
                    }
                })
                // 节点的角色一栏机能
                .state('dashboard.config.listRole', {
                    url:'/role/:category/:nid/list',
                    views : {
                        'content@dashboard' : {
                            templateUrl: 'modules/role/role.list.html',
                            controller: 'RoleListController'
                        }
                    }
                })

                // 节点上添加角色
                .state('dashboard.config.addRole', {
                    url:'/role/:category/:nid/add',
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
                    views : {
                        sub_content: {
                            url: '/list',
                            templateUrl: 'modules/distributor/distributor.list.html',
                            controller: 'DistributorListController'
                        }
                    }
                })
                // 创建代理店
                .state('dashboard.distributor.add', {
                    views : {
                        sub_content: {
                            url: '/add',
                            templateUrl: 'modules/distributor/distributor.add.html',
                            controller: 'DistributorAddController'
                        }
                    }
                })
                // 给代理店添加成员，角色及访问控制的等情报
                .state('dashboard.distributor.config', {
                    url: '/:id/config',
                    views : {
                        'sub_sidebar': {
                            templateUrl: 'modules/distributor/distributor.sidebar.html',
                            controller: 'DistributorEditController'
                        },
                        'sub_content' : {
                            template : '<div ui-view=""></div>'
                        }
                    }
                })
                // 显示代理店的基本情报
                .state('dashboard.distributor.config.basic', {
                    url: '/basic',
                    templateUrl: 'modules/distributor/distributor.basic.html',
                    controller: 'DistributorEditController'
                })
                // 设定代理店的访问控制情报
                .state('dashboard.distributor.config.permission', {
                    url: '/permission',
                    templateUrl: 'modules/distributor/distributor.permission.html',
                    controller: 'DistributorEditController'
                })

                // 用户一栏机能
                .state('dashboard.distributor.config.listUser', {
                    url:'/user/:category/:nid/:node_name/list',
                    templateUrl: 'modules/user/user.list.html',
                    controller: 'UserListController'
                })

                // 节点上添加用户
                .state('dashboard.distributor.config.addUser', {
                    url:'/user/:category/:nid/:node_name/add',
                    templateUrl: 'modules/user/user.add.html',
                    controller: 'UserAddController'
                })
                // 节点的角色一栏机能
                .state('dashboard.distributor.config.listRole', {
                    url:'/role/:category/:nid/:node_name/list',
                    templateUrl: 'modules/role/role.list.html',
                    controller: 'RoleListController'
                })

                // 节点上添加角色
                .state('dashboard.distributor.config.addRole', {
                    url:'/role/:category/:nid/:node_name/add',
                    templateUrl: 'modules/role/role.add.html',
                    controller: 'RoleAddController'
                })
                // 给角色添加用户
                .state('dashboard.distributor.config.roleUser', {
                    url:'/role/:role_id/node/:nid/:node_name',
                    templateUrl: 'modules/role/role.user.html',
                    controller: 'RoleUserController'
                })
                // 角色的详细情报
                .state('dashboard.distributor.config.roleDetails', {
                    url:'/role/:role_id/:node_name',
                    templateUrl: 'modules/role/role.details.html',
                    controller: 'RoleDetailsController'
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
                // 代理店一览机能
                .state('dashboard.developer.list', {
                    views : {
                        sub_content: {
                            url: '/list',
                            templateUrl: 'modules/developer/developer.list.html',
                            controller: 'developerListController'
                        }
                    }
                })
                // 创建开发商
                .state('dashboard.developer.add', {
                    views : {
                        sub_content: {
                            url: '/add',
                            templateUrl: 'modules/developer/developer.add.html',
                            controller: 'developerAddController'
                        }
                    }
                })
                //// 给开发商添加成员，角色及访问控制的等情报
                //.state('dashboard.developer.config', {
                //    url: '/:id/config',
                //    views : {
                //        'sub_sidebar': {
                //            templateUrl: 'modules/dashboard/sidebar.html',
                //            controller: 'DeveloperEditController'
                //        },
                //        'sub_content' : {
                //            template : '<div ui-view=""></div>'
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
                ;
            }]);
});