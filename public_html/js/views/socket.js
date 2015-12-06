/**
 * Created by maxim on 06.12.15.
 */
define([
    'backbone',
], function(
    Backbone
){

    var Socket = Backbone.View.extend({

        initialize: function(){
            $('.page').append(this.el);
        },
        model: null,
        ws: null,

        init: function(){
            this.ws = new WebSocket("ws://localhost:8080/game");

            this.table();
            var that = this;

            this.ws.onopen = function (event) {
                console.log("Web Socket opened");
            }

            this.ws.onmessage = function (event) {
                var data = JSON.parse(event.data);
            }

            this.ws.onclose = function (event) {
                console.log("WebSocket closed");
                that.ws.close();
            }
        },

        onGameStart: function() {
            $("body").find('.page').load(this.init());
        },

        clearCanvas: function() {
            var canvas = document.getElementById('example'),
                ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,canvas.width,canvas.height);
        },

        table: function() {
            var canvas = document.getElementById('example'),
                ctx = canvas.getContext('2d'),
                pic = new Image();
            pic.src = 'http://www.muscleandfitness.com/sites/muscleandfitness.com/files/media/John_Cena.jpg';
            pic.onload = function() {
                ctx.drawImage(pic, 0, 0, 300, 150);
            }

        },

        knockCena: function() {
            canvas = document.getElementById('example');
            context = canvas.getContext('2d');
            this.clearCanvas();
            this.table();
        }

    });

    return Socket;
});
