define(['angular', 'lodash', 'uiRouter','angularLocalStorage'], function(angular,_) {
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

            $scope.lodash = function() {
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

                var perms = ['distributor','outlet'];

                _.forEach(perms, function(p) {
                    if (privileges[p] && _.isArray(privileges[p])) {
                        privileges[p].push(1);
                    } else {
                        privileges[p] = [1];
                    }
                });
                //console.log(JSON.stringify(privileges));

                perms.push('distributor.add');

                _.forEach(perms, function(p) {
                    if (privileges[p] && _.isArray(privileges[p])) {
                        privileges[p].push(2);
                    } else {
                        privileges[p] = [2];
                    }
                });
                console.log(JSON.stringify(privileges));

            };




        });
});