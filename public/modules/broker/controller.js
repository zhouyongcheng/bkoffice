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



        });
});