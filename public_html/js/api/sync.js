define([
    'backbone',
    'models/user'
], function(
    Backbone,
    user
){

    var SIGNIN_URL = '/signin';
    var SIGNUP_URL = '/signup';

    return function(method, model, options) {
        var data = model.toJSON();

        alert("url: " + options.url);

        var requestType;

        if(options.url === SIGNUP_URL) {
            requestType = 'POST';
        } else if(options.url === SIGNIN_URL) {
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

            console.log(response);
            if(options.url === SIGNUP_URL) {
                alert("REGISTRATION DONE");
                //alert(response);
                model.trigger('signupCompleteEvent');
            }
        });

    }
});