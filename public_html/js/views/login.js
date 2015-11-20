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
            'click .login-form__input-submit__item' : 'login'
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

        login: function() {
            alert('LOGIN');

            this.user.url = 'http://127.0.0.1:8080/api/v1/auth/signin/';
            var login = $('input[name=name]').val();
            var password = $('input[name=password]').val();

            this.user.set({'name': login});
            this.user.set({'password': password});

            this.user.save();
        }

    });

    return new View();
});
