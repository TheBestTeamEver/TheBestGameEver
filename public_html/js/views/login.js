define([
    'backbone',
    'tmpl/login',
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
            'submit' : 'submitClick'
        },

        initialize: function () {
            $('.page').append(this.el); 
            this.render()
            if(this.user.get('isLogged')) {
                $(location).attr("href", "#");
            }
        },

        render: function () {
            this.$el.html(this.template);
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            if(this.user.get('isLogged')) {
                $(location).attr("href", "#");
            }
        },

        hide: function () {
            this.$el.hide();
        },

        submitClick: function(event) {
            event.preventDefault();
            this.login();
        },

        login: function() {
            //event.preventDefault();
            console.log("LOGIN SEND");

            var login = $('input[name="login"]').val();
            var password = $('input[name="pass"]').val();

            this.user.save({
              name: login,
              password: password}, {url: '/signin'}
            );
        }

//        signinFailed: function() {
//            this.listenTo(this.user, this.user.signinFailedEvent, function() {
//                if(this.user.get('isLogged')) {
//                    $('.login').hide();
//                    $('.logout').show();
//                    $(location).attr("href", "#");
//                } else {
//                    $(location).attr("href", "#login");
//                }
//            });
//        }


    });

    return new View();
});