define([
    'backbone'
], function(
    Backbone
){

    var viewsArray = [];

    var VM = Backbone.View.extend({

        addView: function() {
            for(var i = 0; i < arguments.length; i++) {
                viewsArray.push({data: arguments[i], isHidden: false});
                this.listenTo(arguments[i], 'show', this.hideView);
            }
        },

        hideView: function(view) {
            if(view.name === 'game') {
                if(view.user.get('isLogged') === true) {
                    view.start();
                    view.render();
                }
            }
            viewsArray.forEach(function(item, i, viewsArray) {
                if(view.cid == (item.data).cid) item.isHidden = false;
                if(view.cid != (item.data).cid && (item.isHidden === false)) {
                    (item.data).hide();
                    item.isHidden = true;
                    console.log((item.data).cid + " was hide");
                }
            });
        }
    });

    return new VM();
});
