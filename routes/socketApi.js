/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 7:01 PM
 * To change this template use File | Settings | File Templates.
 */

var _ = require('underscore');

var admin = function(){
     var self = this;
    this.id;//socket id
    this.name;// for login name in future
    this.isAvailable = 1; //1 or 0
    this.clientSize = 0;  //max to 5
    this.clients_connected = [];// used to save connected client's id
}   ;
var client = function(){
    var self = this;
    this.id;//socket id
    this.name;// for login name in future
    this.isAvailable = 1; //1 or 0
}  ;
exports.socket_start = function (io) {
// one object save admins
// one object save clients
    var admins = {};
    var clients = {};

    io.sockets.on('connection', function (socket) {
        socket.on('ask', function (msg) {
            //msg : { to : admin Id, body  }
            if(msg.to){
                io.sockets.socket(msg.to).emit('ask',{ from: socket.id, body: msg.body });
            }else{
                //find one admin who is available
                var available_admin = _.find(admins,function(item){
                    if(item.isAvailable === 1)
                    return item;
                })  ;
                if(available_admin === null || available_admin === undefined){
                    // return to user to wait a minutes
                    io.sockets.socket(socket.id).emit('answer',{ body: 'no available support, try again after 1 minutes'});
                    return;
                }

                available_admin.clientSize++;
                if(available_admin.clientSize === 3) //one admin process with 3 clients
                    available_admin.isAvailable = 0;
                if(available_admin.clients_connected.indexOf(socket.id) === -1)
                    available_admin.clients_connected.push(socket.id);
                io.sockets.socket(available_admin.id).emit('ask',{ from: socket.id, body: msg.body });
            }
            //socket.emit('answer',msg);
        });
        socket.on('answer', function (msg) {
            io.sockets.socket(msg.to).emit('answer',{ from:socket.id, body:msg.body});
        });
        socket.on("register",function(msg){
             // msg - {role:1} 1 means admin, 2 means clients
            if(msg.role === 1){
                var admin_item = new admin();
                admin_item.id = socket.id;
                admin_item.name = 'admin';
                admins[socket.id] = admin_item;
            }else{
                var client_item = new client();
                client_item.id = socket.id;
                client_item.name = 'client';
                clients[socket.id] = client_item;
            }
        })  ;
        socket.on("logout", function(msg){
            if(msg.role === 1){
                delete admins[socket.id];
            } else{
                delete  clients[socket.id];
                //find admin 's clients
            }
        });
    });

};

