define([
    'backbone'
], function(
    Backbone
){

    var url = {
        'login': '/api/v1/auth/signin/',
        'register': '/api/v1/auth/signup/'
    };

    var User = Backbone.Model.extend({

        initialize: function() {
            var that = this;
            this.set({'isLogged': false});
        },

        sync: function(method, model, options) {
            var userModel = model;
            var userMethod = method;
            var userOptions = options;
            if(userMethod == 'create') {
                var userData = userModel.toJSON();
                
                alert(userModel.url);
                alert(JSON.stringify(userData));

                debugger;
                var xhr = $.ajax({
                    type: 'POST',
                    url: userModel.url,
                    data: JSON.stringify(userData),
                    dataType: 'json',
                    contentType: 'applicaton/json',
                    success: function() {
                        debugger;
                        that.set({'isLogged': true});
                        alert("SUCCESS");
                    }
                });
            }
        },


    });
    return new User();
});