define(['angular'], function(angular) {

    var logger = angular.module('atm.logger', []);

    logger.factory('loggerService', function() {
        return {
            debug : function(message) {
                console.log('debug : ' + message);
            },
            info : function(message) {
                console.log('info : ' + message);
            },
            warn : function(message) {
                console.log('warn : ' + message);
            },
            error : function(message) {
                console.log('error : ' + message);
            }
        };
    });

});
