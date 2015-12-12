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

        init: function(){
            debugger;
            var ws;
            ws = new WebSocket("ws://localhost:8080/gameplay");

            //this.table();
            var that = this;

            ws.onopen = function (event) {
                console.log("Web Socket opened");
            };

            ws.onmessage = function (event) {
                var data = JSON.parse(event.data);
                if (data.status == "start") {
                    document.getElementById("wait").style.display = "none";
                    document.getElementById("gameplay").style.display = "block";
                    document.getElementById("enemyName").innerHTML = data.enemyName;
                }

                if (data.status == "finish") {
                    document.getElementById("gameOver").style.display = "block";
                    document.getElementById("gameplay").style.display = "none";

                    if (data.win)
                        document.getElementById("win").innerHTML = "winner!";
                    else
                        document.getElementById("win").innerHTML = "loser!";
                }

                if (data.status == "increment" && data.name == "${myName}") {
                    document.getElementById("myScore").innerHTML = data.score;
                    document.getElementById("sena").setAttribute("style",
                        "margin-left: " + data.x + "px;"+"margin-top: " + data.y + "px;");

                }

                if (data.status == "increment" && data.name == document.getElementById("enemyName").innerHTML) {
                    document.getElementById("enemyScore").innerHTML = data.score;
                    document.getElementById("sena").setAttribute("style",
                        "margin-left: " + data.x + "px;"+"margin-top: " + data.y + "px;");

                }
            };

            ws.onclose = function (event) {
                console.log("WebSocket closed");
                that.ws.close();
            }
        },

        onGameStart: function() {
            $("body").find('.page').load(this.init());
        },

        clearCanvas: function() {
            //var canvas = document.getElementById('example'),
            //    ctx = canvas.getContext('2d');
            //ctx.clearRect(0,0,canvas.width,canvas.height);
        },

        table: function() {
            //var canvas = document.getElementById('example'),
            //    ctx = canvas.getContext('2d'),
            //    pic = new Image();
            //pic.src = 'http://www.muscleandfitness.com/sites/muscleandfitness.com/files/media/John_Cena.jpg';
            //pic.onload = function() {
            //    ctx.drawImage(pic, 0, 0, 100, 100);
            //}
        },

        knockCena: function() {
            var message = "{}";
            ws.send(message);
        }

    });

    return Socket;
});
