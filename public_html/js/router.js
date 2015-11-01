define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/login',
    'views/registration',
    'views/viewmanager'
], function(
    Backbone,
    main,
    scoreboard,
    game,
    login,
    registration,
    viewmanager 
){


    viewmanager.addView(main);
    console.log("addView main");
    viewmanager.addView(scoreboard);
    console.log("addView scoreboard");
    viewmanager.addView(game);
    console.log("addView game");
    viewmanager.addView(login);
    console.log("addView login");
    viewmanager.addView(registration);
    console.log("addView registration");


    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'registrationAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            main.show()
        },
        scoreboardAction: function () {

        },
        gameAction: function () {

        },
        loginAction: function () {

        },
        registrationAction: function () {

        }
    });

    return new Router();
});