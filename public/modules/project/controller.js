define(['angular','lodash'], function(angular,_) {
    angular.module('projectControllers', ['ui.bootstrap'])
        .controller('projectController', ['$scope', function($scope) {
            $scope.title = 'project management'
        }])
        // 楼盘一览功能
        .controller('projectListController', ['$scope', function($scope) {
        }])
        .controller('projectAddController', ['$scope', function($scope) {
            $scope.title = 'project management'
        }]);
});