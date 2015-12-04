/**
 * Created by cmwin on 10/23/15.
 */
define(['angular','jquery','js/directive', 'modules/system/controller'], function(angular, $) {

    console.log("*********************************");
    console.log('system module loaded');
    $('#system_sidebar').metisMenu({
        toggle: false
    });
    console.log("*********************************");

    return angular.module('systemModule', ['atm.directives','systemControllers']);
});
