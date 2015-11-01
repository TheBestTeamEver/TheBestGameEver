define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: '.page',
        template: tmpl,

        initialize: function () {
            this.render()
            console.log("game view is initialized");
        },

        render: function () {
            this.$el.html(this.template);
            console.log("game view rendered");
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            console.log("game view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("game view hided");
        }

    });

    return new View();
});
