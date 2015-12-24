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
            //$('.page').append(this.el);
        },
        user: user,

        ws: null,

        init: function(){
            //var ws;

            var user_name = this.user.get('name');
            var host = location.hostname;
            var port = location.port;
            this.ws = new WebSocket("ws://" + host + ':' + port +"/gameplay");

            //this.table();
            var that = this;

            this.ws.onopen = function (event) {
                console.log("Web Socket opened");
            };

            this.ws.onmessage = function (event) {
                var data = JSON.parse(event.data);
                console.log(data);
                if (data.status == "start") {
                    $('.pgh').addClass('pgh__gamestart');
                    document.getElementById("wait").style.display = "none";
                    //document.getElementByClass("title").style.display = "none";
                    document.getElementById("gameplay").style.display = "block";
                    document.getElementById("enemyName").innerHTML = data.enemyName;
                }

                if (data.status == "finish") {
                    document.getElementById("gameOver").style.display = "block";
                    document.getElementById("gameplay").style.display = "none";
                    //document.getElementByClass("title").style.display = "block";

                    if (data.win)
                        document.getElementById("win").innerHTML = "winner!";
                    else
                        document.getElementById("win").innerHTML = "loser!";
                }

                if (data.status == "increment" && data.name == user_name) {
                    document.getElementById("myScore").innerHTML = data.score;

                }

                if (data.status == "increment" && data.name == document.getElementById("enemyName").innerHTML) {
                    document.getElementById("enemyScore").innerHTML = data.score;
                }
            };   

            this.ws.onclose = function (event) {
                console.log("WebSocket closed");
                that.ws.close();
            }
        },

        onGameStart: function() {
            $("body").find('.page').load(this.init());
            $("body").on("click", ".bla", function(){
               $(this).css({ "background-image": "url('/design/explosion.gif')" })
                .delay(200)
                .hide('slow')
                .css({ "background-image": "url('/minpic/assets/john_cena/john_cena1.png')" })
                .show('slow');
            });
        },

        knockCena: function() {
            console.log('knock');
            var message = "{}";
            this.ws.send(message);
        }

    });

    return Socket;
});
