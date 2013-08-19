/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/18/13
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */
var admin_socket =  io.connect('http://localhost');

var adminChatModel = function(options){
    var self = this;
    this.clientId = options.id;
    this.answer = ko.observable();
    //this.dialog = ko.observable();
    this.sendMsg = function(){
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        var sendMsgBlock =  '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
            +'</span><span class="msg-reply">'
            + self.answer()
            +'</span></span>'  ;
        //
        $('#'+self.clientId+'win').append(sendMsgBlock);
        admin_socket.emit("answer",{ "to": admin_to, "body" : self.answer() });
        this.answer('');
    };
}   ;

var adminChatCollModel = function(items){
     var self = this;
    this.lists = ko.observableArray(items);
    this.rows = ko.computed(function(){
//        if(!items || items.length == 0)
//            return;
        var result = [], row, cols = 4;
        for (var i = 0 , j = self.lists().length; i < j; i++) {
            var item = self.lists()[i];
            if (i % cols === 0) {
                if (row)
                    result.push(row);
                row = [];
            }
            row.push(item);
        }
        if (row) {
            result.push(row);
        }
        return result;
    },self);
}   ;
var admin_to = null;
var clients_tos = [];
$(function(){

    admin_socket.emit("register",{'role':1});
    $(window).unload(function(){
        admin_socket.emit("unregister",{'role':1});
    });
    var chatRoomCollModel = new adminChatCollModel([]);

    ko.applyBindings(chatRoomCollModel,document.getElementById("adminChatRoom"));


    admin_socket.on("ask", function(msg){
       // find if the #adminChat has the child who has data-chat-id = msg.from
        var tmp = new adminChatModel({id: msg.from});
        var exist = _.find(chatRoomCollModel.lists(), function(single){
            return single.clientId === msg.from;
        })  ;
        if(!exist)
            chatRoomCollModel.lists.push(tmp);

        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();

        admin_to = msg.from;
        //generate a chat panel with the from id, data-chat-from

        var ask =  '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
            +'</span><span class="msg">'
            + "client ask: " + msg.body
            +'</span></span>';

        $('#'+msg.from+'win').append(ask);
    });

//    $('a.chatSend').on('click',function(){
//        //find the parent
//
//        var inputMsg = $('input.chatMsg');
//        var chatWin = $( 'div.chatWindow');
//        var today=new Date();
//        var h=today.getHours();
//        var m=today.getMinutes();
//        var s=today.getSeconds();
//        var answering = inputMsg.val();
//        var sendMsg = '<span class="msg-block"><span class="time">'+ h + ":" + m +":" + s
//            +'</span><span class="msg-reply">'
//            + answering
//            +'</span></span>'  ;
//        chatWin.append(sendMsg);
//        inputMsg.val('');
//        if(admin_to == null)
//            admin_socket.emit("answer",{ "body" : answering });
//        else
//            admin_socket.emit("answer",{ "to": admin_to, "body" : answering });
//
//    })  ;
});