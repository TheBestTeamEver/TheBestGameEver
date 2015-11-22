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

        registration: function() {
            alert("REGISTRATION SEND");

            this.user.url = '/signup';

            var login = $('input[name=name]').val();
            var email = $('input[name=email]').val();
            var password = $('input[name=password]').val();

            this.user.set({'name': login});
            this.user.set({'email': email});
            this.user.set({'password': password});

            this.user.save();
        }

    });

    return new View();
});
