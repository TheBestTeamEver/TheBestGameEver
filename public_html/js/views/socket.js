/**
 * Created by maxim on 06.12.15.
 */
define([
    'backbone',
    'models/user'
], function(
    Backbone,
    user
){

    var Socket = Backbone.View.extend({

        initialize: function(){
        },
        user: user,

        ws: null,

        init: function(){

            var user_name = this.user.get('name');
            var host = location.hostname;
            var port = location.port;
            this.ws = new WebSocket("ws://" + host + ':' + port +"/gameplay");

            var that = this;

            this.ws.onopen = function (event) {
                console.log("Web Socket opened");
            };

            this.ws.onmessage = function (event) {
                var data = JSON.parse(event.data);
                console.log(data);
                if (data.status == "start") {
                    $('.pgh').addClass('pgh__gamestart');
                    $('.hello').hide();
                    $('.title').hide();
                    $("#wait").hide();
                    $("#gameplay").show();
                    $("#enemyName").text(data.enemyName);
                }

                if (data.status == "finish") {
                    $("#gameOver").show();
                    $("#gameplay").hide();

                    if (data.win)
                        $("#win").text("winner!");
                    else
                        $("#win").text("loser!");
                }

                if (data.status == "increment" && data.name == user_name) {
                    $("#myScore").text(data.score);

                }

                if (data.status == "increment" && data.name == $("#enemyName").text()) {
                    $("#enemyScore").text(data.score);
                }
            };   

            this.ws.onclose = function (event) {
                console.log("WebSocket closed");
                that.ws.close();
            }
        },

        knockCena: function() {
            console.log('knock');
            var message = "{}";
            this.ws.send(message);
        }

    });

    return Socket;
});
