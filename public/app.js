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
    'serviceModule',
    'distributorModule',
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
         'ngFileUpload',
         'restangular',
         'angular-jwt',
         'LocalStorageModule',
         'loginModule',
         'dashboardModule',
         'userModule',
         'serviceModule',
         'distributorModule',
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
        .config(['$urlRouterProvider','$stateProvider','$httpProvider','RestangularProvider','jwtInterceptorProvider','localStorageServiceProvider',function($urlRouterProvider, $stateProvider,$httpProvider,RestangularProvider,jwtInterceptorProvider, localStorageServiceProvider) {
            // used for CORS
            //$httpProvider.defaults.withCredentials = true;

            RestangularProvider.setBaseUrl("http://192.168.0.103:3041/");
            localStorageServiceProvider.setPrefix('portal').setNotify(true, true)

            // used for jwt begin
            jwtInterceptorProvider.tokenGetter = ['jwtHelper','localStorageService',function(jwtHelper,localStorageService) {
                if (localStorageService.isSupported) {
                    var jwt = localStorageService.get('jwt');
                    //var detail = jwtHelper.decodeToken(jwt);
                    //console.log("---------------------------");
                    //console.log("detail token : " + detail);
                    //console.log("---------------------------");
                    return jwt;
                }
            }];
            $httpProvider.interceptors.push('jwtInterceptor');
                // used for jwt end

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
                // 服务商管理机能
                .state('dashboard.service', {
                    url: '/service',
                    abstract: true,
                    template: '<ui-view />'
                }).state('dashboard.service.list', {
                    url: '/list',
                    templateUrl: 'modules/service/service.list.html',
                    controller: 'ServiceListController'
                }).state('dashboard.service.edit', {
                    url: '/edit/:id',
                    templateUrl: 'modules/service/service.edit.html',
                    controller: 'ServiceEditController'
                }).state('dashboard.service.add', {
                    url: '/add',
                    templateUrl: 'modules/service/service.add.html',
                    controller: 'ServiceAddController'
                })
                // 代理店管理机能
                .state('dashboard.distributor', {
                    url: '/distributor',
                    abstract: true,
                    template: '<ui-view />'
                }).state('dashboard.distributor.list', {
                    url: '/list',
                    templateUrl: 'modules/distributor/distributor.list.html',
                    controller: 'DistributorListController'
                }).state('dashboard.distributor.edit', {
                    url: '/edit/:id',
                    templateUrl: 'modules/distributor/distributor.edit.html',
                    controller: 'DistributorEditController'
                }).state('dashboard.distributor.add', {
                    url: '/add',
                    templateUrl: 'modules/distributor/distributor.add.html',
                    controller: 'DistributorAddController'
                })
                // 门店管理机能
                .state('dashboard.outlet', {
                    url: '/outlet',
                    abstract: true,
                    template: '<ui-view />'
                }).state('dashboard.outlet.list', {
                    url: '/list',
                    templateUrl: 'modules/outlet/outlet.list.html',
                    controller: 'OutletListController'
                }).state('dashboard.outlet.edit', {
                    url: '/edit/:id',
                    templateUrl: 'modules/outlet/outlet.edit.html',
                    controller: 'OutletEditController'
                }).state('dashboard.outlet.add', {
                        url: '/add',
                        templateUrl: 'modules/outlet/outlet.add.html',
                        controller: 'OutletAddController'
                })

                // 用户管理机能
                .state('dashboard.user', {
                    url: '/user',
                    abstract: true,
                    template: '<ui-view />'
                }).state('dashboard.user.list', {
                    url: '/list',
                    templateUrl: 'modules/user/user.list.html',
                    controller: 'UserListController'
                }).state('dashboard.user.edit', {
                    url: '/edit/:id',
                    templateUrl: 'modules/user/user.edit.html',
                    controller: 'UserEditController'
                }).state('dashboard.user.add', {
                    url: '/add',
                    templateUrl: 'modules/user/user.add.html',
                    controller: 'UserAddController'
                })
                
                // 经纪人管理机能
                .state('dashboard.realtor', {
                    url: '/realtor',
                    abstract: true,
                    template: '<ui-view />'
                }).state('dashboard.realtor.list', {
                    url: '/list',
                    templateUrl: 'modules/realtor/realtor.list.html',
                    controller: 'RealtorListController'
                }).state('dashboard.realtor.edit', {
                    url: '/edit/:id',
                    templateUrl: 'modules/realtor/realtor.edit.html',
                    controller: 'RealtorEditController'
                }).state('dashboard.realtor.add', {
                    url: '/add',
                    templateUrl: 'modules/realtor/realtor.add.html',
                    controller: 'RealtorAddController'
                })
                


                // 文件上传功能
                .state('upload', {
                    url: '/upload',
                    templateUrl: 'modules/upload/upload.html',
                    controller: 'UploadController'
                }).state('master', {
                    url: '/master',
                    templateUrl: 'modules/master/master.html',
                    controller: 'MasterController'
                }).state('master.list', {
                    resolve : {
                        categories : function(Restangular) {
                            return Restangular.all('/api/categories').getList().$object;
                        }
                    },
                    url: '/list',
                    templateUrl: 'modules/master/list.html',
                    controller: 'MasterListController'
                }).state('master.create', {
                    url: '/create',
                    templateUrl: 'modules/master/create.html',
                    controller: 'MasterCreateController'
                }).state('master.update', {
                    url: '/update/:category/:code',
                    templateUrl: 'modules/master/update.html',
                    controller: 'MasterUpdateController'
                }).state('broker', {
                    url: '/broker',
                    templateUrl: 'modules/broker/broker.html'
                }).state('buying', {
                    url: '/buying',
                    templateUrl: 'modules/buying/buying.html',
                    controller: 'BuyingController'
                }).state('selling', {
                    url: '/selling',
                    templateUrl: 'modules/selling/selling.html',
                    controller : 'SellingController'
                }).state('repository', {
                    url: '/repository',
                    templateUrl: 'modules/repository/repository.html'
                }).state('alliance', {
                    url: '/alliance',
                    templateUrl: 'modules/alliance/alliance.html',
                    controller : 'AllianceController'
                }).state('projects', {
                    url: '/projects',
                    templateUrl : 'modules/project/projects.html'
                }).state('projects.detail', {
                    views : {
                        'filters' : {
                            templateUrl : 'modules/project/filters.html'
                        },
                        'menu' : {
                            templateUrl : 'modules/project/menu.html'
                        },
                        'content' : {
                            templateUrl:'modules/project/content.html'
                        }
                    }
                }).state('projects.list', {
                    url:'/list',
                    //templateUrl:'modules/project/projects.list.html',
                    views : {
                        'filters' : {
                            templateUrl : 'modules/project/filters.html'
                        },
                        'menu' : {
                            templateUrl : 'modules/project/menu.html'
                        },
                        'content' : {
                            templateUrl:'modules/project/content.html'
                        }
                    }
                }).state('projects.add', {
                    url:'/add',
                    //templateUrl:'modules/project/projects.add.html',
                    views : {
                        'filters' : {
                            templateUrl : 'modules/project/filters.html'
                        },
                        'menu' : {
                            templateUrl : 'modules/project/menu.html'
                        },
                        'content' : {
                            templateUrl:'modules/project/content.html'
                        }
                    }
                });
            }]);
});