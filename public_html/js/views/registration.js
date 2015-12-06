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

        signUpSuccess: function(response, status, xhr) {
            if(response.status === 'OK') {
                this.user.set('isLogged', true);
                this.set('login', name);
                $(location).attr("href", "#");
            } else {
                alert("User already exist");
            }
        },

        signUpError: function() {
            alert("Произошла какая-то стремная и непонятная ошибка");
        },

        registration: function(event) {
            var login = this.$('input[name="login"]').val();
            var email = this.$('input[name="email"]').val();
            var password = this.$('input[name="password"]').val();


            this.user.save({
                name: login,
                email: email,
                password: password}, {
                    url: '/signup',
                    success: function() {
                        console.log("success");
                    }
                }
            );
        }


    });

    return new View();
});
