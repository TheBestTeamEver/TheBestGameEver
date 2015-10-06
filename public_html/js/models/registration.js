define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
    	initialize: function(){
            this.on('submit', function(){
                this.onSubmit();
            });	
            console.log("Registration model initialized.");
    	},
        onSubmit: function(event) {
            
            $.ajax({
                type: "POST",
                url: "/signup",
                data: data
            }).done(function(obj) {
                console.log("SERVER ANSWER : " + obj);
                var answer = JSON.parse(obj);
                if (answer.success) {
                    location.href = "#login";
                } else {
                    console.log(answer.message);
                }
            });
        }    
    });

    return Model;
});