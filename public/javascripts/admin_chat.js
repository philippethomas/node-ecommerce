/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */

var admin_socket =  io.connect('http://localhost');
$(function(){
    admin_socket.on("ask", function(data){
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();

        var ask =  '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
            +'</span><span class="msg">'
            +data.data
            +'</span></span>';
        $('#chatWindow').append(ask);
    });

    $('#chatSend').on('click',function(){
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        var answering = $('#chatMsg').val();
        var sendMsg = '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
            +'</span><span class="msg-reply">'
            + answering
            +'</span></span>'  ;


        $('#chatWindow').append(sendMsg);
        $('#chatMsg').val('');
        admin_socket.emit("answer",{ "data" : answering });

    })  ;
});