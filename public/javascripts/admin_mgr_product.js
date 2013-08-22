/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/22/13
 * Time: 10:31 AM
 * To change this template use File | Settings | File Templates.
 */

var ProductClientModel = function(){

}   ;

var ProductListClientModel = function(){
    var self = this;
    this.currentPage = 1;
    this.lists = ko.observableArray([]);
}   ;

var products = new ProductListClientModel(); //global

$(function(){
    ko.applyBindings(products, document.getElementById("productsBody"));
   //ajax call the products with page
    $.ajax({
         url:'/products/page/1',
        contentType:'application/json',
        type:'GET',
        success: function(data){                                              //
            if(data.length > 0){
                products.lists.push.apply(products.lists,data);
            }
        },
        error: function(err){

        }
    })  ;
})  ;