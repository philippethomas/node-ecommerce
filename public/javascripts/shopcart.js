/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/16/13
 * Time: 9:58 PM
 * To change this template use File | Settings | File Templates.
 */

var CartItem = function (item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.src = item.imgs[0];
    this.quantity = 1;
}
var ShopCart = (function () {
    var context = {};
    var size = 0;
    var cart = {};
    cart.addItem = function (item) {
        var tmp = _.find(context, function (single) {
            return item.id === single.id;
        });
        if (tmp) {

            context[tmp.id].quantity++;
        }
        else {
            context[item.id] = new CartItem(item);
            size++;
        }
    };
    cart.removeItem = function (id) {
        delete context[id];
        size--;
    };
    cart.count = function () {
        return size;
    };

    cart.html = function () {
        var html = '<li class="title"><span class="floatLeft">CHECKOUT<span class="floatRight">' + cart.count() + ' ITEMS</span></li>';
        var total = 0;
        $.each(Object.keys(context), function (index, key) {
            html += '<li class="item"><span class="thumb"><img src="' + context[key].src + '">' //+ context[key].name
                + '</span><span class="price">$' + context[key].price
                + '</span><span class="quantity badge">' + context[key].quantity + '</span>'
                + '<a class="remove" onclick="deleteCartItemFrom(' + context[key].id
                + ')"><i class="icon-remove"></i></a>' + '</li>';
            total += context[key].price * context[key].quantity;
        });
        html += '<li>Total : $' + Number(total).toFixed(2) + '<a class="btn btn-success">Continue</a> </li>';
        return html;
    };
    return cart;
})();

function deleteCartItemFrom(id) {
    ShopCart.removeItem(id);
}