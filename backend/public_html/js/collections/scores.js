define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Player
){

    var Players = Backbone.Collection.extend({
    	model: Player,
    	url:'/scoreboard',

    	comparator: function(model) {
      		return -model.get('score');
    	}

    });


	var players = [
		new Player({name:'Ostin', score: 543}),
		new Player({name:'Kianu', score: 3654}),
		new Player({name:'JJ', score: 375}),
		new Player({name:'CJ', score: 22}),
		new Player({name:'Artas', score: 1}),
		new Player({name:'Neo', score: 765}),
		new Player({name:'Lebovski', score: 978}),
		new Player({name:'Muhammed', score: 234}),
		new Player({name:'Tison', score: 897}),
		new Player({name:'Mandy', score: 6757})
	];

	var playersCollection = new Players(players);

	playersCollection.forEach(function (model) {

		console.log(model.get("name"));

	});

    return playersCollection;
});

