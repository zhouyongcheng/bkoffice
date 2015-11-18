/**
 * Created by cmwin on 10/23/15.
 */
define(['angular', 'js/directive', 'userModule', 'modules/distributor/controller'], function(angular) {
    return angular.module('distributorModule', ['atm.directives','userModule', 'distributorControllers']);
});
