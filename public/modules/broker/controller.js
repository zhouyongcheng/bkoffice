define(['angular',
        'lodash',
        'async',
        'uiRouter',
        'uiBootstrap',
        'angularAside',
        'angularLocalStorage',
        'atmLogger',
        'js/directive'
    ], function(angular, _, async) {
        angular.module('brokerControllers', [
            'restangular',
            'ui.router',
            'ui.bootstrap',
            'ngAside',
            'LocalStorageModule',
            'atm.directives'
        ])
        .controller('brokerListController', ['$scope', '$aside', 'loggerService', function ($scope,$aside,loggerService) {

                $scope.openAside = function(position) {
                    $aside.open({
                        templateUrl: 'modules/broker/aside.html',
                        placement: position,
                        backdrop: true,
                        controller: function($scope, $modalInstance) {
                            $scope.ok = function(e) {
                                $modalInstance.close();
                                e.stopPropagation();
                            };
                            $scope.cancel = function(e) {
                                $modalInstance.dismiss();
                                e.stopPropagation();
                            };
                        }
                    })
                };


                $scope.signup = {
                    name : ''
                };


            var privileges = {
                key1: 'value1',
                key2: 'value2'
            };

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



            $scope.lodash = function() {

                async.waterfall([
                    function(cb) {
                        loggerService.debug("111");
                        cb();
                    }, function(cb) {
                        loggerService.debug("222");
                        cb();
                    }, function(cb) {
                        loggerService.debug("333");
                        cb(null, 'hello world');
                    }
                ], function(e, results) {
                    if (e) {
                        loggerService.error(e);
                    } else {
                        loggerService.debug("444" + results);
                    }
                });


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




        }]);
});