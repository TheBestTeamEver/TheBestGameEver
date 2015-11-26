define([
    'backbone'
], function(
    Backbone
){

    var viewsArray = [];

    var VM = Backbone.View.extend({


        addView: function(view) {
            viewsArray.push({data: view, isHidden: false});
            console.log(view + "Added");
            this.listenTo(view, 'show', this.hideView);
        },

        hideView: function(view) {
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
