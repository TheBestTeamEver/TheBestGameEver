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
            console.log("scoreboard view is initialized");
            this.collection.push(new this.model({name: "Maxon", score: 99}));
            this.collection.push(new this.model({name: 'Misha', score: 100}));
            this.collection.push(new this.model({name: 'Kikimora', score: 11}));
            this.collection.push(new this.model({name: 'Pvael', score: 83}));
            this.collection.push(new this.model({name: 'Stas', score: 97}));
            this.collection.push(new this.model({name: 'Alex', score: 42}));
            this.collection.push(new this.model({name: 'Burunduk', score: 46}));
            this.collection.push(new this.model({name: 'Crazytosser', score: 79}));
            this.collection.push(new this.model({name: 'Lalala', score: 17}));
            this.collection.push(new this.model({name: 'Lollie', score: 94}));
            this.collection.comparator = function(player) {
                 return -player.get("score");
            };
            this.collection.sort('score');
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