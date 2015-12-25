define([
    'backbone',
    'api/sync'
], function(
    Backbone,
    sync
){


    var User = Backbone.Model.extend({

        defaults: {
            name: ""
        },

        sync: sync


    });
    return new User();
});