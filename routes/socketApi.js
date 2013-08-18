/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 7:01 PM
 * To change this template use File | Settings | File Templates.
 */

exports.socket_start = function (io) {
    var ask = io.of('/ask');
    var answer = io.of('/answer');

    ask.on('connection', function(socket){

    })  ;
    io.sockets.on('connection', function (socket) {
        socket.on('ask', function (from, msg) {
            socket.emit('answer');
        });
        socket.on('answer', function (from, msg) {

        });
        socket.on('disconnect', function (from, msg) {

        });
    });

};

