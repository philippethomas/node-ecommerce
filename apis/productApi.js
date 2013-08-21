/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 2:31 PM
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require('mongoose');
var productModel = require("../models/productSchema");

mongoose.connect('mongodb://localhost/test');

var productApi = function () {
    var self = this;
    var db = mongoose.connection;
    this.FindById = function (req, res) {
        var id = req.params.id;
        res.send("respond with a product id = " + id);
    };
    this.FindAll = function (req, res) {
        var pageNumber = req.params.pageNumber;

        res.send("respond with a product pg = " + pageNumber);
    };
    this.Save = function (req, res) {
        var body = req.body;
        var input = new productModel(body);
    }
};

module.exports = new productApi();