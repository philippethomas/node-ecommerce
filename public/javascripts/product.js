/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/12/13
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */

var productListModel = function (items) {
    var self = this;
    self.lists = ko.observableArray(items);
    self.filter_types = ko.observable("all");

    this.min_price = ko.observable(0);
    this.max_price = ko.observable(100);

    this.rows = ko.computed(function () {
        var result = [], row, cols = 4;
        //filter price
        var filters = self.filter_types();
        var filterArrays = null;
        if (self.filter_types() === 'all') {
            filterArrays = ko.utils.arrayFilter(self.lists(), function(item){
                 return (item.price >= self.min_price() && item.price <= self.max_price())
            });
        } else {
            filterArrays = ko.utils.arrayFilter(self.lists(), function (item) {
                return (item.type === self.filter_types() && item.price >= self.min_price() && item.price <= self.max_price());
            });
        }
        for (var i = 0 , j = filterArrays.length; i < j; i++) {
            var item = filterArrays[i];
//            if(self.filter_types() === 'all' ){
            if (i % cols === 0) {
                if (row)
                    result.push(row);
                row = [];
            }
            row.push(item);
        }

        if (row) {
            result.push(row);
        }
        return result;
    }, this);

    self.ToggleType = function (filter_type, data, evt) {
        $('.overlay').stop().fadeTo(150, 0);//clean action menu
        var selectedTypeIcon = $(evt.target);
//        selectedTypeIcon.toggleClass('selected');
        if (selectedTypeIcon.hasClass('selected')) {
            selectedTypeIcon.removeClass('selected');
            self.filter_types('all');
        }
        else {
            selectedTypeIcon.addClass('selected');
            //remove sibling
            selectedTypeIcon.siblings('.selected').removeClass('selected');
            self.filter_types(filter_type);
        }
    };
};


var productModel = function (data) {
    var self = this;
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.price2;//means new price
    this.type = data.type;
    this.star = data.star;
    this.comments;
    this.isHot = data.isHot;
    this.isCoupon = data.isCoupon;
    this.imgs = data.imgs;
    this.title = ko.computed(function () {
        if (self.price2) {
            return self.name + " - $<del>" + self.price + "</del>  $" + self.price2;
        } else {
            return self.name + " - $" + self.price;
        }
    }, self);
    this.Enlarge = function (item) {

    };
    //
    this.EnableAction = function (item, evt) {
        //get image
        var img = evt.target;
        //get sibling
        $('.overlay').stop().fadeTo(150, 0);
        var menus = $(img).siblings('.overlay');
        if (menus) {
            menus.hover(function () {
                $(this).stop().fadeTo(150, 0.9);
//            menus.attr('z-index',-1);
            });
//        menus.attr('z-index',2);
            menus.stop().fadeTo(150, 0.9);
        }
    };
    this.DisableAction = function (item, evt) {
        var img = evt.target;
//        menus.attr('z-index',-1);
        var menus = $(img).siblings('.overlay');
        if (menus)
            menus.stop().fadeTo(150, 0);
    };
    this.Detail = function (item) {

    };
    this.Buy = function(item,evt){

        ShopCart.addItem(item);
        var currentImg = $('#'+item.id).parent('.polaroid');
//        currentImg.addClass('fly-to-cart')
        var originOffset = currentImg.offset();
        var originTop = originOffset.top;
        var originLeft = originOffset.left;
        var originWidth = currentImg.width();
        var originHeight = currentImg.height();
        //consider use css3 transform - translate and transition
        currentImg.css({position:'fixed',top:originTop,left: originLeft})
            .animate({top:$('#shopCart').offset().top,left:$('#shopCart').offset().left,width:'1%',height:'1%'},3000,
            function(){
                currentImg.css({
                    position:'relative',
                    width:originWidth,
                    height:originHeight,
                    top:'',
                    left:''
                });
            });

    }
}

var productType = {
    Men: 1,
    Women: 2,
    Boy: 3,
    Girl: 4
};