define([
    'backbone',
    'tmpl/registration',
    'models/user'
], function(
    Backbone,
    tmpl,
    user
){

    var Registration = Backbone.View.extend({
        template: tmpl,
        user: user,

        events: {
            'submit' : 'submitClick',
        },

        initialize: function () {
            $('.page').append(this.el);
            this.render();
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
            var login = this.$('input[name="login"]').val();
            var email = this.$('input[name="email"]').val();
            var password = this.$('input[name="password"]').val();

            var data = {name: login, email: email, password: password};

            this.user.save({}, {
                    url: '/signup',
                    data: data,
                    requestType: 'POST'
                }
            );
        },

    });

    return new Registration();
});
