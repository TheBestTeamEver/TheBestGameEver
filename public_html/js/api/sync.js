define([
    'backbone',
    'models/user'
], function(
    Backbone,
    user
){

    var SIGNIN_URL = '/signin';
    var SIGNUP_URL = '/signup';
    var LOGOUT_URL = '/logout';
    var CHECK_URL = '/check';

    return function(method, model, options) {
        if(method === 'create') {
            var data = model.toJSON();
            console.log("url: " + options.url);
            var requestType;

            if (options.url === SIGNUP_URL) {
                requestType = 'POST';
            } else if (options.url === SIGNIN_URL) {
                requestType = 'POST';
            } else if (options.url === LOGOUT_URL) {
                alert("URL CORRECT");
                requestType = 'POST';
                data = {};
            } else if (options.url === CHECK_URL) {
                requestType = 'POST';
            }

            var xhr = $.ajax({
                type: requestType,
                url: options.url,
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/json'
            });
            xhr.done(function(response) {
                if (options.url === SIGNUP_URL) {
                    if (response.status === 'OK') {
                        model.signupCompleted(data.name);
                    } else {
                        model.signupFailed();
                    }
                } else if (options.url === SIGNIN_URL) {
                    if (response.status === 'OK') {
                        model.signinCompleted(data.name);
                    } else {
                        model.signinFailed();
                    }
                } else if (options.url === LOGOUT_URL) {
                    if(response.status === 'OK') {
                        alert("logout");
                        model.logout();
                    }
                } else if (options.url === CHECK_URL) {
                    if(response.status === 'OK') {
                        console.log("CHECK DONE");
                        model.check();
                    }
                }
            });
        }

    }
});