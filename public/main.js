require.config({
    paths : {
        atmLogger : 'services/logger',
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
        angularModalService : 'bower_components/angular-modal-service/dst/angular-modal-service',
        checklistModel:'bower_components/checklist-model/checklist-model',
        metisMenu: 'bower_components/metisMenu/dist/metisMenu.min',
        uiBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap.min',
        uiBootstrapTpls: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        prettify: 'bower_components/prettify/prettify.1.0.1',
        treeControl: 'bower_components/angular-tree-control/angular-tree-control',
        loginModule : 'modules/login/loginModule',
        dashboardModule : 'modules/dashboard/dashboardModule',
        userModule: 'modules/user/userModule',
        roleModule: 'modules/role/roleModule',
        organizationModule: 'modules/organization/organizationModule',
        serviceModule: 'modules/service/serviceModule',
        distributorModule: 'modules/distributor/distributorModule',
        developerModule: 'modules/developer/developerModule',
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
        systemModule:'modules/system/systemModule',
        includeModule:'modules/include/includeModule',
        ngFileUpload : 'bower_components/angular-file-upload/dist/angular-file-upload.min',
        fileUploadShim : 'bower_components/ng-file-upload/ng-file-upload-shim.min',
        fileUpload : 'bower_components/ng-file-upload/ng-file-upload.min',
        async : 'bower_components/async/dist/async.min'
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
        angularModalService : {
            deps : ['angular']
        },
        checklistModel : {
            deps : ['angular']
        },
        metisMenu : {
            deps : ['twitter']
        },
        uiBootstrap : {
          deps : ['twitter', 'angular']
        },
        uiBootstrapTpls : {
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
        },
        async : {
            exports : 'async'
        }
    }
});

require([
    'jquery',
    'angular',
    'app',
    'domReady',
    'metisMenu',
    'uiBootstrap',
    'uiBootstrapTpls',
    'prettify',
    'treeControl',
    'async'
], function($, angular, app, domReady) {
    'use strict';
    domReady(function() {
        $(function() {
            //$('#menu').metisMenu();
            //$('#menu2').metisMenu({
            //    toggle: false
            //});

        });
        angular.bootstrap(document, ['portal']);
    });
});