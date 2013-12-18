/**
 * Created with IntelliJ IDEA.
 * User: joah.zhang
 * Date: 13-12-11
 * Time: 上午10:28
 * To change this template use File | Settings | File Templates.
 */

angular.module("ka.Services",[]).
    constant("constant",{
        initMenuActive:  [false,false,false,false,false]
    }).
    factory("utilService", function(){
        return {
            clone: function(obj){
                // Handle the 3 simple types, and null or undefined
                if (null == obj || "object" != typeof obj) return obj;

                // Handle Date
                if (obj instanceof Date) {
                    var copy = new Date();
                    copy.setTime(obj.getTime());
                    return copy;
                }

                // Handle Array
                if (obj instanceof Array) {
                    var copy = [];
                    for (var i = 0, len = obj.length; i < len; ++i) {
                        copy[i] = this.clone(obj[i]);
                    }
                    return copy;
                }

                // Handle Object
                if (obj instanceof Object) {
                    var copy = {};
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
                    }
                    return copy;
                }

                throw new Error("Unable to copy obj! Its type isn't supported.");
            }
        }
    }).
    factory("constantService", function(constant,utilService){
        return {
            getInitConstant: function(key){
                if(constant[key]){
                    return utilService.clone(constant[key]);
                }
                return null;
            }
        }
    }).
    factory("menuService", function(constantService){
        var initActive = constantService.getInitConstant("initMenuActive");
        return {
            getInitMenuActive: function(){
                return initActive;
            },
            resetInitMenuActive: function(){
                return constantService.getInitConstant("initMenuActive");
            },
            disabledAllMenu: function(){
//                var init = constantService.getInitConstant("initMenuActive");
                $.each(initActive, function(index){
                    initActive[index] = false;
                });
                return initActive;
            },
            activeMenu: function(index){
                this.disabledAllMenu();
                initActive[index] = true;
            }
        }
    }).
    factory("productService", function($timeout){
        var id = 3;
        var data = {
            productList : [
                {
                    id: 1,
                    modelName: "aaa",
                    type: 1,
                    description: "this is model aaa"
                },
                {
                    id: 2,
                    modelName: "bbb",
                    type: 2,
                    description: "this is model bbb"
                },
                {
                    id: 3,
                    modelName: "ccc",
                    type: 3,
                    description: "this is model ccc"
                }
            ]
        };
        return {
            getProductList : function(){
                return data.productList;
            },
            addProduct: function(type, desc){
                data.productList.push({
                    id: id++,
                    type: type,
                    description: desc
                })
            },
            getProductById: function(id){
                for(var i= 0, len = data.productList.length; i<len ; i++){
                    if(data.productList[i].id == id){
                        return data.productList[i];
                    }
                }
                return null;
            },
            queryProductList: function(callback){
                $timeout((function cb(cx){
                    return function(){
                        var self = cx;
                        var productList = self.getProductList();
                        callback(productList);
                    }

                })(this), 5000, false);
            }
        }
    });
