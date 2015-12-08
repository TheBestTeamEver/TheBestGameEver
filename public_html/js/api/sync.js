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
            debugger;
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
                        $(location).attr("href", "#");
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
                        $(location).attr("href", "#");
                    } else {
                        options.error({
                            isLogged : false
                        });
                        alert("BAD");
                    }
                } else if (options.url === LOGOUT_URL) {
                    if(response.status === 'OK') {
                        //alert("logout");
                        //model.logout();
                    }
                } else if (options.url === CHECK_URL) {
                    if(response.status === 'OK') {
                        //console.log("CHECK DONE");
                        //model.check();
                    }
                }
            });
        } else if(method === "read") {
            alert(model.get('isLogged'));
        }

    }
});