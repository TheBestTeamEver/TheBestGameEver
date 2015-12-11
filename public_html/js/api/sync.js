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
            var data = options.data;
            console.log("url: " + options.url);
            var requestType = options.requestType;

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
                        options.success({
                            isLogged : true
                        });
                    } else {
                        options.error({
                            isLogged : false
                        });
                        alert("BAD");
                    }
                } else if (options.url === SIGNIN_URL) {
                    if (response.status === 'OK') {
                        console.log("success");
                        options.success({
                            isLogged : true
                        });
                    } else {
                        options.error({
                            isLogged : false
                        });
                        alert("BAD");
                    }
                } else if (options.url === LOGOUT_URL) {
                    if(response.status === 'OK') {
                        options.success({
                            isLogged: false
                        });
                    } else {
                        options.error({
                            isLogged : true
                        });
                        alert("BAD");
                    }
                }
            });
        } else if(method === "read") {

        }
    }
});