/**
 * Created with JetBrains WebStorm.
 * User: yilo
 * Date: 8/19/13
 * Time: 1:34 PM
 * To change this template use File | Settings | File Templates.
 */

var chatWidget = function(option){
    this.render = function(){
        this.html = '<div class="chat-panel">' +
            '<div class="chat-heading"><a data-hint="Enlarge" class="white hint--right pull-left"><i class="icon-zoom-in"></i></a>' +
            '<a data-hint="Close" class="white pull-right"><span>×</span></a></div>' +
            '<div class="row"><div class="col-lg-12 chatWindow">' +
            '<div class="chat-footer"><div class="form-inline"><input type="text" placeholder="Enter message here..." class="chatMsg">' +
            '<a class="btn btn-success btn-xs chatSend"><i class="icon-mail-reply"></i></a></div></div></div>';


    }
}