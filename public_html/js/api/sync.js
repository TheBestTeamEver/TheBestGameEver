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
    //var CHECK_URL = '/check';

    return function(method, model, options) {
        var data = options.data || {};
        var requestType = options.requestType || 'POST';
        var dataType = options.dataType || 'json';
        var contentType = options.contentType || 'application/json';

        var xhr = $.ajax({
            type: requestType,
            url: options.url,
            dataType: dataType,
            data: JSON.stringify(data),
            contentType: contentType
        });

        if(method === 'create') {
            console.log("url: " + options.url);
            xhr.done(function(response) {
                if (options.url === SIGNUP_URL) {
                    if (response.status === 'OK') {
                        options.success({
                            isLogged : true,
                            name : options.name
                        });
                        $(".error").hide();
                    } else {
                        options.error({
                            isLogged : false
                        });
                        //TODO: убрать отсюда говнокодинг. Наверно с помощью слушаетля во вьюхе
                        $(".error").text("PREPARE YOUR HEAD FOR ERRORS!!!").css({"color":"#ff0000"});
                    }
                } else if (options.url === SIGNIN_URL) {
                    if (response.status === 'OK') {
                        console.log("success");
                        options.success({
                            isLogged : true
                        });
                        $(".error").hide();
                    } else {
                        options.error({
                            isLogged : false
                        });
                        $(".error").text("PREPARE YOUR HEAD FOR ERRORS!!!").css({"color":"#ff0000"});
                    }
                } else if (options.url === LOGOUT_URL) {
                    if(response.status === 'OK') {
                        options.success({
                            isLogged: false
                        });
                        $(".error").hide();
                    } else {
                        options.error({
                            isLogged : true
                        });
                        $(".error").text("PREPARE YOUR HEAD FOR ERRORS!!!").css({"color":"#ff0000"});
                    }
                }
            });
        } else if(method === "read") {

        }
    }
});