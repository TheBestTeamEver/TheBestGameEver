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
        el: '.page',
        template: tmpl,
        collection: players,
        initialize: function () {
            console.log(this.collection.toJSON());
        },
        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
            return this;
        },
        show: function () {
            this.$el.siblings(".button_back").show();   
        },
        hide: function () {
            // TODO
        }

    });

    return new View();
});

