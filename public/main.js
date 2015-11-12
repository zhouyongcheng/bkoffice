require.config({
    paths : {
        jquery : 'bower_components/jquery/dist/jquery.min',
        angular : 'bower_components/angular/angular.min',
        ngResource:'bower_components/angular-resource/angular-resource.min',
        uiRouter : 'bower_components/angular-ui-router/release/angular-ui-router.min',
        twitter: 'bower_components/bootstrap/dist/js/bootstrap.min',
        domReady : 'bower_components/requirejs-domready/domReady',
        lodash : 'bower_components/lodash/lodash.min',
        restangular : 'bower_components/restangular/dist/restangular.min',
        angularJwt : 'bower_components/angular-jwt/dist/angular-jwt.min',
        angularLocalStorage : 'bower_components/angular-local-storage/dist/angular-local-storage.min',
        metisMenu: 'bower_components/metisMenu/dist/metisMenu.min',
        bootstrapTpls: 'bower_components/angular-ui-bootstrap/ui-bootstrap-tpls.0.11.2',
        prettify: 'bower_components/prettify/prettify.1.0.1',
        treeControl: 'bower_components/angular-tree-control/angular-tree-control',
        loginModule : 'modules/login/loginModule',
        dashboardModule : 'modules/dashboard/dashboardModule',
        userModule: 'modules/user/userModule',
        organizationModule: 'modules/organization/organizationModule',
        serviceModule: 'modules/service/serviceModule',
        distributorModule: 'modules/distributor/distributorModule',
        outletModule: 'modules/outlet/outletModule',
        realtorModule: 'modules/realtor/realtorModule',
        masterModule: 'modules/master/masterModule',
        brokerModule : 'modules/broker/brokerModule',
        buyingModule : 'modules/buying/buyingModule',
        sellingModule : 'modules/selling/sellingModule',
        repositoryModule : 'modules/repository/repositoryModule',
        allianceModule : 'modules/alliance/allianceModule',
        uploadModule : 'modules/upload/uploadModule',
        projectModule : 'modules/project/projectModule',
        ngFileUpload : 'bower_components/angular-file-upload/dist/angular-file-upload.min',
        fileUploadShim : 'bower_components/ng-file-upload/ng-file-upload-shim.min',
        fileUpload : 'bower_components/ng-file-upload/ng-file-upload.min'
    },
    shim : {
        twitter : {
            deps: ['jquery']
        },
        angular : {
            deps : ['twitter'],
            exports : 'angular'
        },
        uiRouter : {
            deps : ['angular']
        },
        ngResource : {
            deps : ['angular']
        },
        restangular : {
            deps : ['angular','lodash']
        },
        angularJwt : {
            deps : ['angular']
        },
        angularLocalStorage : {
            deps : ['angular']
        },
        metisMenu : {
            deps : ['twitter']
        },
        bootstrapTpls : {
            deps : ['twitter','angular']
        },
        treeControl: {
            deps : ['angular']
        },
        fileUpload : {
            deps : ['angular']
        },
        ngFileUpload : {
            deps : ['angular']
        }
    }
});

require([
    'jquery',
    'angular',
    'app',
    'domReady',
    'metisMenu',
    'bootstrapTpls',
    'prettify',
    'treeControl'
], function($, angular, app,domReady) {
    'use strict';
    domReady(function() {
        $(function() {
            $('#menu').metisMenu();
            $('#menu2').metisMenu({
                toggle: false
            });
            $('#menu3').metisMenu({
                doubleTapToGo: true
            });
            $('#menu4').metisMenu();
        });
        angular.bootstrap(document, ['portal']);
    });
});