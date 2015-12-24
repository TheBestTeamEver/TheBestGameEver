define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    players
){

    var Scoreboard = Backbone.View.extend({
        template: tmpl,
        collection: players,

        initialize: function () {
            $('.page').append(this.el); 
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
            return this;
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return new Scoreboard();
});