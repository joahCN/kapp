/**
 * Created with IntelliJ IDEA.
 * User: joah.zhang
 * Date: 13-12-11
 * Time: 上午10:28
 * To change this template use File | Settings | File Templates.
 */

angular.module("ka.Controller",[]).
    controller("indexCtrl", function($scope, menuService){
        $scope.initActive = menuService.getInitMenuActive();
//        $scope.activeMenu = function(index){
//            $scope.initActive = menuService.disabledAllMenu();
//            $scope.initActive[index] = true;
//        }

    }).
    controller("productCtrl", function($scope, productService, $routeParams, $location, $log, menuService){
        menuService.activeMenu(1);
        var pid = $routeParams.id;
        if(pid){
            $scope.product = productService.getProductById(pid);
            $log.info("product: "+$scope.product);
        }

        $scope.submitProduct = function(){
            if(!pid){
                productService.addProduct($scope.product.type, $scope.product.description);
            }
            $scope.status = "submitted";
            $log.info($scope.product);
            $location.path("/productList");
        }

    }).
    controller("productList", function($scope, productService, $location, $log, menuService, $rootScope){
        $scope.hide = true;
        $scope.show = false;
        menuService.activeMenu(0);
        //$scope.productList;
        productService.queryProductList(getProductListCallback);
        $scope.editProduct = function(id){
            $log.info("click id: "+id);
            $location.path("/product/"+id);
        };
        $scope.popWindow = function(){
            $scope.show = true;
            $scope.hide = false;
            $scope.$broadcast("popShow");
        };

        function getProductListCallback(productList){
            $scope.productList = productList;
            $scope.$digest();
        }
    });
