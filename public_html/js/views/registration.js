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
            'click .reg-form__input-submit__item' : 'registration'
        },

        initialize: function () {
            $('.page').append(this.el); 
            this.render()
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

        registration: function(event) {
            event.preventDefault();
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

    });

    return new View();
});
