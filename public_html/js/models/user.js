define([
    'backbone',
    'api/sync'
], function(
    Backbone,
    sync
){


    var User = Backbone.Model.extend({

        defaults: {
            error: false
        },

        logout: function() {
            this.set('isLogged', false);
            $(location).attr("href", "/");
        },

        //check: function() {
        //    this.set('isLogged', true);
        //},

        initialize: function() {
            //this.save({}, {url: '/check'});
        },

        validate: function(attrs, options) {
            return this.error;
        },

        sync: sync


    });
    return new User();
});