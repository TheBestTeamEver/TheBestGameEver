/**
 * Created by maxim on 11.12.15.
 */
define([
    'backbone',
    'models/user'
], function(
    Backbone,
    user
){

    var App = Backbone.View.extend({
        user: user,

        initialize: function() {
            this.user.on('change:isLogged', function(user) {
                $(location).attr("href", "#");
                alert(user.get('isLogged'));
            });
        }
    });

    return new App();
});
