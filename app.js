
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var productApi = require("./routes/productApi");
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
app.get('/users', user.list);

var admin_chat = require('./routes/adminChat');
app.get('/adminchat',admin_chat.admin_chat);

app.get('/products/pager/:pageNumber',productApi.FindAll);
app.post('/products',productApi.Save);
app.get('/products/:id',productApi.FindById);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

require('./routes/socketApi').socket_start(io);


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
