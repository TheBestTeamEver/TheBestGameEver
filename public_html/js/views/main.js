define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: '.page',
        template: tmpl,

        initialize: function () {
            this.render()
            console.log("main view is initialized");
        },

        render: function () {
            this.$el.html(this.template);
            console.log("main view rendered");
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            console.log("main view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("main view hided");
        }

    });

    return new View();
});