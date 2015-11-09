define([
    'backbone',
    'tmpl/main__menu'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        template: tmpl,

        initialize: function () {
            $('.menu__main').append(this.el); 
            this.render()
            console.log("menu__main view is initialized");
        },

        render: function () {
            this.$el.html(this.template);
            console.log("menu__main view rendered");
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
            console.log("menu__main view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("menu__main view hided");
        }

    });

    return new View();
});
