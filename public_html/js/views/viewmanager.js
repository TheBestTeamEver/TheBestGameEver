define([
    'backbone',
], function(
    Backbone,
){

    var viewsArray = [];

    var VM = Backbone.View.extend({

        addView: function(view) {
            viewsArray.push(view);
            console.log(view + "Added");
            this.listenTo(view, 'show', this.hide);
        },

        hideView: function() {
            views.forEach(function(entryView) {
                entryView.hide();
                console.log(entryView + "was hide");
            });
        }
    });

    return new VM();
});
