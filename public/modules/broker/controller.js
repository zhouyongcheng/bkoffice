define(['angular', 'lodash', 'async', 'uiRouter','angularLocalStorage'], function(angular, _, async) {
    angular.module('brokerControllers', ['restangular', 'ui.router', 'LocalStorageModule'])
        .controller('brokerListController', function ($scope) {

            $scope.tooltip = {
              title : 'hello world'
            };

            $scope.popover = {
                title: 'popover Title',
                content: 'popover content'
            };

            $scope.alerts = [
                { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
                { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
            ];

            $scope.addAlert = function() {
                $scope.alerts.push({msg: 'Another alert!'});
            };

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            var inc = function(n, callback, timeout) {
                //将参数n自增1之后的结果返回给async
                timeout = timeout || 200;
                setTimeout(function() {
                    callback(null, n+1);
                }, timeout);
            };

            $scope.lodash = function() {

                async.series([
                    function(cb) { inc(3, cb); },
                    function(cb) { inc(8, cb); },
                    function(cb) { inc(2, cb); }
                ], function(e, results) {
                    console.log('1.1 err: ', e);
                    console.log('1.1 results: ', results);
                });



                var privileges = {};

                //var perms = [{distributor: '1'},{outlet:'2'}, {outlet:'3'}];
                //
                //_.forEach(perms, function(p) {
                //    _.forOwn(p, function(value, key) {
                //        if (privileges[key] && _.isArray(privileges[key])) {
                //            privileges[key].push(value);
                //        } else {
                //            privileges[key] = [value];
                //        }
                //    });
                //});
                //
                //console.log(JSON.stringify(privileges))

                //var perms = ['distributor','outlet'];
                //
                //_.forEach(perms, function(p) {
                //    if (privileges[p] && _.isArray(privileges[p])) {
                //        privileges[p].push(1);
                //    } else {
                //        privileges[p] = [1];
                //    }
                //});
                ////console.log(JSON.stringify(privileges));
                //
                //perms.push('distributor.add');
                //
                //_.forEach(perms, function(p) {
                //    if (privileges[p] && _.isArray(privileges[p])) {
                //        privileges[p].push(2);
                //    } else {
                //        privileges[p] = [2];
                //    }
                //});
                //console.log(JSON.stringify(privileges));

            };




        });
});