define([
    'backbone',
    'api/sync'
], function(
    Backbone,
    sync
){


    var User = Backbone.Model.extend({

        logout: function() {
            this.set('isLogged', false);
            $(location).attr("href", "/");
        },

        check: function() {
            this.set('isLogged', true);
        },

        initialize: function() {
            //this.save({}, {url: '/check'});
        },

        sync: sync


    });
    return new User();
});