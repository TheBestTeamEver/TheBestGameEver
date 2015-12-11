define([
    'backbone',
    'tmpl/login',
    'models/user'
], function(
    Backbone,
    tmpl,
    user
){

    var Login = Backbone.View.extend({
        template: tmpl,
        user: user,

        events: {
            'submit' : 'submitClick'
        },

        initialize: function () {
            $('.page').append(this.el); 
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
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

            var login = this.$('input[name="login"]').val();
            var password = this.$('input[name="password"]').val();

            var data = {name: login, password: password};

            this.user.save({}, {
                    url: '/signin',
                    data: data,
                    requestType: 'POST'
                }
            );
        }



    });

    return new Login();
});