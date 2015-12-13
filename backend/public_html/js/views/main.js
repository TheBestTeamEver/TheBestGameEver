define([
    'backbone',
    'tmpl/main',
    'models/user',
    'views/socket'
], function(
    Backbone,
    tmpl,
    user,
    socket
){

    var Main = Backbone.View.extend({
        template: tmpl,
        user: user,

        events: {
            'click .logout': 'logout',
            'click .startgame' : 'start'
        },

        initialize: function () {
            $('.page').append(this.el); 
            this.render();
            $('.logout').hide();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            if(this.user.get('isLogged')) {
                $('.login').hide();
                $('.logout').show();
                $('.signup').hide();
            }
        },

        hide: function () {
            this.$el.hide();
        },

        logout: function() {
            this.user.save({}, {url: '/logout'});
            $(location).attr("href", "/");
        },

        start: function() {
            this.socket = new socket({user: this.user});
            this.socket.onGameStart();
        },

    });

    return new Main();
});