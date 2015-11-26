define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    players
){

    var View = Backbone.View.extend({
        template: tmpl,
        collection: players,

        initialize: function () {
            $('.page').append(this.el); 
            this.render()
            console.log("collection view is initialized");
        },

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
            console.log("collection view rendered");
            return this;
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
            console.log("collection view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("collection view hided");
        }

    });

    return new View();
});