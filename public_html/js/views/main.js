define([
    'backbone',
    'tmpl/main',
    'models/user'
], function(
    Backbone,
    tmpl,
    user
){

    var View = Backbone.View.extend({
        template: tmpl,
        user: user,

        events: {
            'click .logout': 'logout'
        },

        initialize: function () {
            $('.page').append(this.el); 
            this.render();
            if(this.user.get('isLogged')) {
                $('.login').hide();
                $('.logout').show();
                $('.signup').hide();
            } else {
                $('.logout').hide();
            }
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
        }

    });

    return new View();
});