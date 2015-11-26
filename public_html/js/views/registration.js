define([
    'backbone',
    'tmpl/registration',
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
            this.render();
            if(this.user.get('isLogged')) {
                $('.login').hide();
                $('.logout').show();
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
            this.registration();
        },

        registration: function(event) {
            //event.preventDefault();
            alert("REGISTRATION SEND");

            var login = $('input[name="login"]').val();
            var email = $('input[name="email"]').val();
            var password = $('input[name="pass"]').val();


            this.user.save({
                name: login,
                email: email,
                password: password}, {url: '/signup'}
            );

        }

//        signupFailed: function() {
//            this.listenTo(this.user, this.user.signupFailedEvent, function() {
//                if(this.user.get('isLogged')) {
//                    $('.login').hide();
//                    $('.logout').show();
//                    $(location).attr("href", "#");
//                } else {
//                    $(location).attr("href", "#registration");
//                }
//            });
//        }

    });

    return new View();
});
