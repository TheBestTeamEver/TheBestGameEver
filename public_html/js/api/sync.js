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

        options || (options = {});

        if(method === "create") {

            var data = model.toJSON();

            //var success = options.success;
            alert(options.success);
            //var error = options.error;

            console.log("url: " + options.url);

            var requestType;

            if(options.url === SIGNUP_URL) {
                requestType = 'POST';
            } else if(options.url === SIGNIN_URL) {
                requestType = 'POST';
            } else if(options.url === LOGOUT_URL) {
                requestType = 'POST';
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
                alert("done");
                debugger;
                customSuccess = function(response, status, xhr) {
                    console.log("in custom success")
                    success(response, status, xhr);
                },

                customError = function(response, status, xhr) {
                    error(response, status, xhr);
                };

                console.log(options.attrs);
                options.success = customSuccess;
                options.error = customError;
//            if(options.url === SIGNUP_URL) {
//                if(response.status === 'OK') {
//                    success(resp, status, xhr);
//                } else {
//                    model.signupFailed();
//                }
//            } else if(options.url === SIGNIN_URL) {
//                if(response.status === 'OK') {
//                    model.signinCompleted(data.name);
//                } else {
//                    model.signinFailed();
//                }
//            } else if(options.url === LOGOUT_URL) {
//                model.logout();
//            } else if(options.url === CHECK_URL) {
//
//            }
            });
        }
    }
});
