define([
    'backbone',
    'api/sync'
], function(
    Backbone,
    sync
){


    var User = Backbone.Model.extend({

//        signupCompletedEvent: 'signupCompletedEvent',
//        signupFailedEvent: 'signupFailedEvent',
//        signinCompletedEvent: 'signinCompletedEvent',
//        signinFailedEvent: 'signinFailedEvent',

        signupCompleted: function(name) {
            this.set('isLogged', true);
            this.set('login', name);
            console.log("Player >>" + this.get('login') + "<< successfully sign up. Login status " + this.get('isLogged'));
            $(location).attr("href", "#");
        },

        signupFailed: function() {
            this.set('isLogged', false);
            console.log(this.get('isLogged'));
//            this.trigger(this.signupFailedEvent);
        },

        signinCompleted: function(name) {
            this.set('isLogged', true);
            this.set('login', name);
            console.log("Player >>" + this.get('login') + "<< successfully log in. Login status " + this.get('isLogged'));
            $(location).attr("href", "#");
//            this.trigger(this.signinCompletedEvent);
        },

        signinFailed: function() {
            this.set('isLogged', false);
            console.log("Signin Failed. Log status " + this.get('isLogged'));
//            this.trigger(this.signinFailedEvent);
        },

        logout: function() {
            this.set('isLogged', false);
            $(location).attr("href", "/");
        },

        check: function() {
            this.set('isLogged', true);
        },

        initialize: function() {
            this.save({}, {url: '/check'});
        },

        sync: sync


    });
    return new User();
});