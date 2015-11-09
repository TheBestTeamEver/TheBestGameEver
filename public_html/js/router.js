define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/login',
    'views/registration',
    'views/viewmanager',
    'views/menu__main'
], function(
    Backbone,
    main,
    scoreboard,
    game,
    login,
    registration,
    viewmanager,
    menu__main
){


    viewmanager.addView(main);
    console.log("addView main");
    viewmanager.addView(game);
    console.log("addView game");
    viewmanager.addView(login);
    console.log("addView login");
    viewmanager.addView(registration);
    console.log("addView registration");
    viewmanager.addView(menu__main);
    console.log("addView menu__main");
    viewmanager.addView(scoreboard);
    console.log("addView scoreboard");


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
            $(".menu__item_start").on("click", function() {
                menu__main.show();
            });
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
        scoreboardAction: function () {
            scoreboard.show();
        }
    });

    return new Router();
});