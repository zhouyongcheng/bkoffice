define(['angular', 'lodash', 'restangular'], function(angular,_) {
    angular.module('atm.directives', ['restangular'])
        .directive('atmTest', function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'js/template/test.html',
                scope: {},
                link: function (scope, elem, attr) {
                    elem.bind('mousemove', function () {
                        elem.css('cursor', 'pointer');
                    });
                }
            };
        })
        .directive('atmGender', function () {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'js/template/gender.html',
                scope: {
                    gender : '='
                },
                link: function (scope, elem, attr) {
                    scope.genders = [
                        {code:'_MALE', label:'男'},
                        {code:'_FEMALE', label:'女'}
                    ];
                }
            };
        })
        .directive('atmLocation', function (Restangular) {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'js/template/location.html',
                scope : {
                    province : '=',
                    city : '=',
                    district : '='
                },
                link : function(scope, elem, attr) {

                    scope.province = "";
                    scope.city = "";
                    scope.district = "";

                    Restangular.one('/region/state/list').get().then(function(data) {
                        scope.provinces = data.result;
                    });

                    scope.changeProvince = function(province) {
                        scope.city = "";
                        scope.district = "";
                        Restangular.one('/region/city/list', province).get().then(function(data) {
                            scope.cities = data.result;
                        });
                    };

                    scope.changeCity = function(province, city) {
                        console.log('province = ' + province);
                        console.log('city = ' + city);

                        scope.district = "";
                        Restangular.one('/region/district/list/'+ province + '/' + city).get().then(function(data) {
                            console.log(JSON.stringify(data));
                            scope.districts = data.result;
                        });
                    };
                }
            };
        }).directive('atmCities', function (Restangular) {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: 'js/template/cities.html',
                scope : {
                    province : '=',
                    city : '=',
                    distributor : '=',
                    district : '='
                },
                link : function(scope, elem, attr) {
                    scope.province = "";
                    scope.city = "";
                    scope.distributors = "";
                    scope.district = "";

                    Restangular.one('/region/state/list').get().then(function(data) {
                        scope.provinces = data.result;
                    });

                    scope.changeProvince = function(province) {
                        scope.city = "";
                        Restangular.one('/region/city/list', province).get().then(function(data) {
                            scope.cities = data.result;
                        });
                    };

                    scope.changeCity = function(province, city) {
                        scope.district = "";
                        scope.distributor = "";

                        Restangular.one('/region/district/list/'+ province + '/' + city).get().then(function(data) {
                            scope.districts = data.result;
                        });

                        //代理店列表取得
                        Restangular.one('/distributor/list/keyword/_/sort/name/order/ASC/limit/_').get().then(function(data) {
                            scope.distributors = data.result;
                        });
                    };
                }
            };
        });
});