define([
    'backbone',
    'tmpl/game',
    'views/socket'
], function(
    Backbone,
    tmpl,
    socket
){

    var View = Backbone.View.extend({
        template: tmpl,

        name: 'game',

        socket: new socket({model: this.model}),

        events: {
            'click .startgame' : 'start',
            'click .game-field' : 'knockCena'
        },

        initialize: function () {
            $('.page').append(this.el);
            //alert(this.name);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
        },

        hide: function () {
            this.$el.hide();
        },

        start: function() {
            this.socket = new socket({model: this.model});
            this.socket.onGameStart();
        },

        knockCena: function() {
            this.socket.knockCena();
        }

    });

    return new View();
});
