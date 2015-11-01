define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    player,
    players
){

    var View = Backbone.View.extend({
        el: '.page',
        template: tmpl,
        collection: players,
        model: player,

        initialize: function () {
            this.render()

            this.collection.push(new this.model({name: "Kirill", score: 99}));
            this.collection.push(new this.model({name: 'Natasha', score: 100}));
            this.collection.push(new this.model({name: 'Peter', score: 11}));
            this.collection.push(new this.model({name: 'Misha', score: 83}));
            this.collection.push(new this.model({name: 'Kostya', score: 97}));
            this.collection.push(new this.model({name: 'John', score: 42}));
            this.collection.push(new this.model({name: 'Mike', score: 46}));
            this.collection.push(new this.model({name: 'Miley', score: 79}));
            this.collection.push(new this.model({name: 'Champion', score: 17}));
            this.collection.push(new this.model({name: 'Anonimus', score: 94}));
            this.collection.comparator = function(player) {
                 return -player.get("score");
            };
            this.collection.sort('score');
            console.log(this.collection.toJSON());

            console.log("scoreboard view is initialized");
        },

        render: function () {
            this.$el.html(this.template(this.collection.toJSON()));
            console.log("scoreboard view rendered");
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
            console.log("scoreboard view showed");
        },

        hide: function () {
            this.$el.hide();
            console.log("scoreboard view hided");
        }

    });

    return new View();
});
