define([
    'backbone',
    'models/score'
], function(
    Backbone,
    player
){

    var Players = Backbone.Collection.extend({
    	model: player,
    	url:'/scores'
    });

	var sortedByScore = Players.add([
		new player({name:'Ostin', score: 543}),
		new player({name:'Kianu', score: 3654}),
		new player({name:'JJ', score: 375}),
		new player({name:'CJ', score: 22}),
		new player({name:'Artas', score: 1}),
		new player({name:'Neo', score: 765}),
		new player({name:'Lebovski', score: 978}),
		new player({name:'Muhammed', score: 234}),
		new player({name:'Tison', score: 897}),
		new player({name:'Mandy', score: 6757})
	]);

	sortedByScore.sortBy(function (player) {

		return player.get("score");

	});



    return new sortedByScore;
});