var $page = $('div#page'),
    currentScreen = 'main';


function showScoreboardScreen() {
    hideMainScreen();
    currentScreen = 'scoreboard';
    $page.html(scoreboardTmpl());
    $page.find('.back').on('click', showMainScreen);
}


function hideScoreboardScreen() {
    $page.find('.back').off('click', showMainScreen);
}


function showGameScreen() {
    hideMainScreen();
    currentScreen = 'game';
    $page.html(gameTmpl());
    $page.find('.back').on('click', showMainScreen);
}


function hideGameScreen() {
    $page.find('.back').off('click', showMainScreen);
}


function showLoginScreen() {
    hideMainScreen();
    currentScreen = 'login';
    $page.html(loginTmpl());

    $page.find('.back').on('click', showMainScreen);
}


function hideLoginScreen() {
    $page.find('.back').off('click', showMainScreen);
}


function showMainScreen() {
    if (currentScreen === 'scoreboard') {
        hideScoreboardScreen();
    } else if (currentScreen === 'game') {
        hideGameScreen();
    } else if (currentScreen === 'login') {
        hideLoginScreen();
    }
    currentScreen = 'main';
    $page.html(mainTmpl()); 
    $page.find('.scoreboard').on('click', showScoreboardScreen);
    $page.find('.start-game').on('click', showGameScreen);
    $page.find('.login').on('click', showLoginScreen);
}


function hideMainScreen() {

    $page.find('.scoreboard').off('click', showScoreboardScreen);
    $page.find('.start-game').off('click', showGameScreen);
    $page.find('.login').off('click', showLoginScreen);
}

showMainScreen();