
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');


var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');

var app = express();


// use nib with stylus
function nib_compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
}

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware({ src:__dirname + '/public', compile:nib_compile}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//route to page
var admin_chat_room = require('./routes/admin_chat_room');
app.get('/admin/chat',admin_chat_room.admin_chat_room);

var admin_mgr_product = require('./routes/admin_mgr_product');
app.get('/admin/mgr/product',admin_mgr_product.admin_mgr_product);


//route to rest api
var productApi = require("./apis/productApi");

app.get('/products/page/:pageNumber',productApi.FindAll);
app.post('/products',productApi.Save);
app.get('/products/:id',productApi.FindById);
app.delete('/products/:id',productApi.Remove);
app.delete('/products',productApi.RemoveAll);

var server = http.createServer(app);
var io = require('socket.io').listen(server);
//route to socket api
require('./apis/socketApi').socket_start(io);


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
