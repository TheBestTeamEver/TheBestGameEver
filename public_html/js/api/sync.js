define([
    'backbone',
    'models/user'
], function(
    Backbone,
    user
){

    var SIGNIN_URL = '/signin';
    var SIGNUP_URL = '/signup';

    var urlMap = {
        '/signin': 'POST',
        'signup': 'POST'
    }

    return function(method, model, options) {
        var data = model.toJSON();

        alert("url: " + options.url);
        var jqxhr = $.ajax({
            type: 'POST',
            url: options.url,
            dataType: 'json',
            contentType: 'application/json'
        });
        jqxhr.done(function(data) {
            if(options.url === SIGNUP_URL) {
                alert("DONE");
                model.trigger('signupCompleteEvent');
            }
        });
    }
});