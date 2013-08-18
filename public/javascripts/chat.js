/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 11:43 AM
 * To change this template use File | Settings | File Templates.
 */

//var socket = io.connect('http://localhost');

$(function(){

    $('#ask').click(function(){
        $('#chat').toggleClass('hidden');
    })  ;

     $('#chatSend').on('click',function(){
         var today=new Date();
         var h=today.getHours();
         var m=today.getMinutes();
         var s=today.getSeconds();
         var sendMsg = '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
             +'</span><span class="msg">'
             +$('#chatMsg').val()
             +'</span></span>'


         $('#chatWindow').append(sendMsg);
         $('#chatMsg').val('');
     })  ;
})  ;