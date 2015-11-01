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

            console.log("main view is initialized");
        },
        render: function () {
            this.$el.html(this.template);
            return this;
        },
        show: function () {
            $(".menu__item_hide").on('click', function() {
                //this.$el.find("menu__item_hide").show();
            });
        },
        hide: function () {
            this.$el.find(".menu__item_hide").hide();
        }

    });

    return new View();
});