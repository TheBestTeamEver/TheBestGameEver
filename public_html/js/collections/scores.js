define([
    'backbone',
    'models/score'
], function(
    Backbone,
    player
){

    var Players = Backbone.Collection.extend({
    	model: player
    });

    return new Players();
});