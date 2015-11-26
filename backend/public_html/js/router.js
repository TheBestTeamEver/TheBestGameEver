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
        }
    });

    return new Router();
});