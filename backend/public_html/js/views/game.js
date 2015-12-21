define([
    'backbone',
    'tmpl/game',
    'views/socket',
    'models/user'
], function(
    Backbone,
    tmpl,
    socket,
    user
){

    var Game = Backbone.View.extend({
        template: tmpl,
        user: user,
        name: 'game',

        socket: new socket({user: this.user}),

        events: {
            'click .bla1' : 'knockCena',
            'click .bla2' : 'knockCena'
        },

        initialize: function () {
            $('.page').append(this.el);
        },

        render: function () {
            this.$el.html(this.template(this.user.toJSON()));
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
            this.socket = new socket({user: this.user});
            this.socket.onGameStart();
        },

        knockCena: function() {
            this.socket.knockCena();
        }

    });

    return new Game();
});
