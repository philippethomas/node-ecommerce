/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 11:43 AM
 * To change this template use File | Settings | File Templates.
 */

var client_socket = io.connect('http://localhost');
var client_to = null;

$(function(){

    $('#ask').click(function(){
        $('div.chat-panel').toggleClass('hidden');
        //register
        if($('#ask').hasClass('hidden'))  {
            client_socket.emit("unregister",{'role':0});
//            $('input.chatMsg').keypress(function(){
//
//            });
        }
        else
            client_socket.emit("register",{'role':0});
    })  ;
    // send ask , listen answer
    client_socket.on("answer", function(msg){
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        if(msg.from)
            client_to = msg.from;

        var answer =  '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
            +'</span><span class="msg-reply">'
            + "admin answer:" + msg.body
            +'</span></span>';
        $('div.chatWindow').append(answer);
    });

     $('a.chatSend').on('click',function(){
         var inputMsg = $('input.chatMsg');
         var chatWin = $('div.chatWindow');
         var today=new Date();
         var h=today.getHours();
         var m=today.getMinutes();
         var s=today.getSeconds();
         var asking = inputMsg.val();
         var sendMsg = '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
             +'</span><span class="msg">'
             + asking
             +'</span></span>'  ;
         chatWin.append(sendMsg);
         inputMsg.val('');
         if(client_to === null)
            client_socket.emit("ask",{ "body" : asking });
         else
            client_socket.emit("ask",{ "to" : client_to, "body" : asking });

     })  ;
})  ;