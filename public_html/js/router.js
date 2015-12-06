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
    VM
){


    VM.addView(main, game, login, registration, scoreboard);


    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'registrationAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            main.show();
        },
        gameAction: function () {
            game.show();
        },
        loginAction: function () {
            login.show();
        },
        registrationAction: function () {
            registration.show();
        },
        scoreboardAction: function() {
            scoreboard.show();
        }
    });

    return new Router();
});