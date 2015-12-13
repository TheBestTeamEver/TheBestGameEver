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
            this.user.on('change:isLogged', function() {
                $(location).attr("href", "#");
            });
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
        },

        hide: function () {
            this.$el.hide();
        }
    });

    return new App();
});
