/**
 * Created with IntelliJ IDEA.
 * User: joah.zhang
 * Date: 13-12-16
 * Time: 下午5:37
 * To change this template use File | Settings | File Templates.
 */

angular.module("ka.Directive",[]).
    directive("popWindow", function(){

        return {
            templateUrl : "templ/popWindow.html",
            restrict: "AE",
            replace: true,
            scope: { },
            controller: function($scope, $element){

            },
            link: function(scope, ele, attr){
                scope.$on("popShow", function(){
                    $(ele).modal();
                    scope.$parent.productList[0].modelName = "changed";
                });
            }
        }

    });
