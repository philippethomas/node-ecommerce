/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 11:43 AM
 * To change this template use File | Settings | File Templates.
 */

var client_socket = io.connect('http://localhost/ask');

$(function(){

    $('#ask').click(function(){
        $('#chat').toggleClass('hidden');
    })  ;

     $('#chatSend').on('click',function(){
         var today=new Date();
         var h=today.getHours();
         var m=today.getMinutes();
         var s=today.getSeconds();
         var asking = $('#chatMsg').val();
         var sendMsg = '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
             +'</span><span class="msg">'
             + asking
             +'</span></span>'  ;


         $('#chatWindow').append(sendMsg);
         $('#chatMsg').val('');
         client_socket.emit("ask",{ "data" : asking });
         client_socket.on("answer", function(data){
             var answer =  '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
                 +'</span><span class="msg-reply">'
                 +data
                 +'</span></span>';
             $('#chatWindow').append(answer);
         });
     })  ;
})  ;