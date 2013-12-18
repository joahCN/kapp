/**
 * Created with IntelliJ IDEA.
 * User: joah.zhang
 * Date: 13-12-11
 * Time: 上午10:27
 * To change this template use File | Settings | File Templates.
 */

angular.module("ka",[
    'ngRoute',
    'ka.Controller',
    'ka.Services',
    'ka.Directive']).
    config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/product/:id?', {
            templateUrl:"partials/addProduct.html",
            controller: "productCtrl"
        });
        $routeProvider.when("/productList", {
            templateUrl:"partials/productList.html",
            controller:"productList"
        });
        $routeProvider.otherwise({redirectTo: '/productList'});
    }]);
