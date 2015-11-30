define(['angular','lodash'], function(angular,_) {
    angular.module('projectControllers', [])
        .controller('projectController', ['$scope', function($scope) {
            $scope.title = 'project management'
        }])
        .controller('projectListController', ['$scope', function($scope) {
            $scope.title = 'project management'
        }])
        .controller('projectAddController', ['$scope', function($scope) {
            $scope.title = 'project management'
        }]);
});