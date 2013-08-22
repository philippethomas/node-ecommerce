/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/20/13
 * Time: 3:10 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var productSchema = new Schema({
//    id: ObjectId,
    name: String,
    price: String,
    price2: String,
    type: Number,
    star: Number,
    isHot: Boolean,
    images: Array
});

module.exports = mongoose.model('Product', productSchema);