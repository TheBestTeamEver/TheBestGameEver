define([
    'backbone',
    'api/sync'
], function(
    Backbone,
    sync
){

    var SIGNIN_URL = '/signin';
    var SIGNUP_URL = '/signup';

    var User = Backbone.Model.extend({

        events: {
            'signupCompleteEvent' : 'signupCompleted',
            'signupFailEvent': 'signupFailed'
        },

        signupCompleted: function() {
        debugger;
            this.set({isLogged: true});
            alert(this.get('isLogged'));
        },

        initialize: function() {
            var that = this;
            this.set('isLogged', false);
        },

        sync: sync


    });
    return new User();
});