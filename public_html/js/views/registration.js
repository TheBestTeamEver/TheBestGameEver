define([
    'backbone',
    'tmpl/registration',
    'models/registration'
], function(
    Backbone,
    tmpl,
    registration
){

    var View = Backbone.View.extend({
        el: '.page',
        template: tmpl,

        initialize: function () {
            this.render()
            console.log("registration view is initialized");
        },

        render: function () {
            this.$el.html(this.template);
            console.log("registration view rendered");
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            console.log("registration view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("registration view hided");
        }

    });

    return new View();
});
