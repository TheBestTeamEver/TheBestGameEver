define([
    'backbone',
    'tmpl/menu__main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: '.menu__main',
        template: tmpl,
        initialize: function () {

            console.log("main view is initialized");
        },
        render: function () {
            this.$el.html(this.template);
            return this;
        },
        show: function () {
        },
        hide: function () {
        }

    });

    return new View();
});
