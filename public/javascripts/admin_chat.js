/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */

var admin_socket =  io.connect('http://localhost/answer');
$(function(){
   admin_socket.on('connect', function(){

   })  ;
});