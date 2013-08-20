/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/12/13
 * Time: 8:17 PM
 * To change this template use File | Settings | File Templates.
 */

var productList; //global entry

$(function () {
    //bind price slider
    $('#priceSlider').slider({
        min: 0, max: 100, orientation: 'horizontal', handle: 'triangle', value: [0, 100]
    }).on('slideStop', function (evt) {
            var prices = evt.value;
            if (prices[0] <= prices[1]) {
                productList.min_price(prices[0]);
                productList.max_price(prices[1]);
            } else {
                productList.min_price(prices[1]);
                productList.max_price(prices[0]);
            }
        });

    $('#shopCart').on('click', function () {
        //global shop cart
        if (ShopCart.count() === 0) {
            $('#cartDetail > ul').empty();
            $('#cartDetail > ul').append("Zero");
        } else {
            $('#cartDetail > ul').empty();
            var html = ShopCart.html();
            $('#cartDetail > ul').append(html);
        }
        $('#cartDetail ').toggleClass('hide')
    });
    $.ajax({
        url: '/data.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            var products = [];
            $.each(data, function (index, item) {
                products.push(new productModel(item));
            });

            productList = new productListModel(products);
            ko.applyBindings(productList);//,document.getElementById('mainContent')
        },
        error: function (resp) {
            resp.responseText;
        }
    });
});