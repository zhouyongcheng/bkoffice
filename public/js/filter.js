/**
 * 定义requirejs模块
 */
define(['angular', 'lodash'],function(angular, _) {

    // 定义angular的filter专用模块
    var app = angular.module('atm.filters', []);

    /**
     * 首字母大写，其他字母小写
     */
    app.directive('toTitleCase', function() {
        return function(str) {
            if (_.isString(str) && str.length > 1) {
                return str.replace(/\w\S*/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
            return str;
        };
    });



});