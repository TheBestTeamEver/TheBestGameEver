define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Player
){

    var Players = Backbone.Collection.extend({
    	model: Player,
    	url:'/scoreboard1',
		//localStorage:new Backbone.LocalStorage('players-backbone'),

    	comparator: function(model) {
      		return -model.get('score');
    	}

    });

	var playersCollection = new Players();

	playersCollection.forEach(function (model) {

		console.log(model.get("name"));

	});

    return playersCollection;
});

