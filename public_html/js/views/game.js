define([
    'backbone',
    'tmpl/game',
    'views/socket',
    'models/user'
], function(
    Backbone,
    tmpl,
    socket,
    user
){

    var Game = Backbone.View.extend({
        template: tmpl,
        user: user,
        name: 'game',

        socket: new socket({user: this.user}),

        initialize: function () {
            $('.page').append(this.el);
        },

        render: function () {
            this.$el.html(this.template(this.user.toJSON()));
            return this;//чтобы иметь возможность делать цепочные вызовы
        },

        show: function () {
            this.$el.show();
            this.trigger('show', this);
        },

        hide: function () {
            this.$el.hide();
        },

        start: function() {
            this.socket = new socket({user: this.user});
            this.socket.init();
            this.onGameStart();
        },

        onGameStart: function() {
            that = this;
            $("body").on("click", ".bla", function(){
                var $bla = $(this);
                var audio = $("#blow")[0];
                audio.play();
                $bla.addClass('bla_kaboom');
                setTimeout(function () {
                    $bla.hide(200, function () {
                        $bla.removeClass('bla_kaboom').show('slow');
                    });
                }, 200);
                console.log($bla.attr('id'));
                var id_msg = String($bla.attr('id'));
                var msg = '{"el":"' + id_msg + '"}';
                that.socket.knockCena(msg);

            });
        }

    });

    return new Game();
});
