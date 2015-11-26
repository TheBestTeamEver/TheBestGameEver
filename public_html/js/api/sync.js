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
        var data = model.toJSON();
        debugger;
        console.log("url: " + options.url);

        var requestType;

        if(options.url === SIGNUP_URL) {
            requestType = 'POST';
        } else if(options.url === SIGNIN_URL) {
            requestType = 'POST';
        } else if(options.url === LOGOUT_URL) {
            requestType = 'POST';
            //data = {};
        } else if(options.url === CHECK_URL) {
            requestType = 'POST';
        }

        var jqxhr = $.ajax({
            type: requestType,
            url: options.url,
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
        jqxhr.done(function(response) {
            if(options.url === SIGNUP_URL) {
                console.log("REGISTRATION DONE");
                console.log("registration response " + JSON.stringify(response));
                console.log(response.status);
                console.log(data.name);
                console.log(data.password);
                if(response.status === 'OK') {
                    model.signupCompleted(data.name);
                    //console.log(data);
                } else {
                    //console.log(data.name);
                    model.signupFailed();
                }
            } else if(options.url === SIGNIN_URL) {
                console.log("LOGIN DONE");
                console.log("login response " + JSON.stringify(response));
                if(response.status === 'OK') {
                    model.signinCompleted(data.name);
                } else {
                    model.signinFailed();
                }
            } else if(options.url === LOGOUT_URL) {
                console.log("LOGOUT DONE");
                console.log("registration response " + JSON.stringify(response));
                model.logout();
            } else if(options.url === CHECK_URL) {
                console.log("CHECK DONE");
            }
        });

    }
});