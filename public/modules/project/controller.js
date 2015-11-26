define(['angular','lodash'], function(angular,_) {
    angular.module('projectControllers', [])
        .controller('ProjectController', ['$scope', function($scope) {
            $scope.title = 'project management'
        }]);
});