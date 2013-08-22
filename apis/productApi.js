/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 2:31 PM
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require('mongoose');
var productModel = require("../models/productSchema");

mongoose.connect('mongodb://10.148.75.67/test');

var productApi = function () {
    var self = this;
    var db = mongoose.connection;
    this.FindById = function (req, res) {
        var id = req.params.id;
        res.send("respond with a product id = " + id);
    };
    this.FindAll = function (req, res) {
        var pageNumber = req.params.pageNumber;
        productModel.find()
            .skip( (pageNumber - 1) * 1).limit(1)
            .exec(function(err,results){
                res.json(results);
            });

    };
    this.RemoveAll = function(req,res){
        productModel.collection.remove().exec();
    }   ;

    this.Remove =   function(req,res){
        var id = req.params.id;
        if(id){
           productModel.findByIdAndRemove({_id:id}, function(err, result){

           });
        }
    }   ;

    this.Save = function (req, res) {
        var body = req.body;
        var input = new productModel(body);
        console.log(input.name);
        input.save(function(err,input){
           if(!err)
            res.send(input._id);
        });
    }
};

module.exports = new productApi();