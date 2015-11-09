define([
    'backbone',
    'tmpl/login',
    'models/login'
], function(
    Backbone,
    tmpl,
    login
){

    var View = Backbone.View.extend({
        template: tmpl,

        initialize: function () {
            $('.page').append(this.el); 
            this.render()
            console.log("login view is initialized");
        },

        render: function () {
            this.$el.html(this.template);
            console.log("login view rendered");
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            console.log("login view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("login view hided");
        }

    });

    return new View();
});
