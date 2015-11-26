/**
 * 安家中国开发商主模块
 */
define(['angular', 'js/directive', 'modules/developer/controller'], function(angular) {
    return angular.module('developerModule', ['atm.directives','developerControllers']);
});