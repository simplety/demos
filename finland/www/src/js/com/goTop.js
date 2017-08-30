/**
 * Created by Kaisla on 30/08/2017.
 */
define(["jquery"], function ($) {
    function GoTop($target) {
        this.init($target);
        this.bind();
    };

    GoTop.prototype = {
        init: function ($target) {
            if ($target != undefined) {
                this.$target = $target;
            } else {
                this.$target = $("<div id='go-top'>Top</div>")
                    .css({
                        "width": "50px",
                        "height": "40px",
                        "position": "fixed",
                        "right": "50px",
                        "bottom": "50px",
                        "border": "2px solid #fff",
                        "border-radius": "3px",
                        "display": "none",
                        "cursor": "pointer",
                        "line-height": "40px",
                        "font-size": "20px",
                        "text-align": "center",
                    }).appendTo($("body"));
            }
        },
        bind: function () {
            $(window).on("scroll", function () {
                var scrollTop = $(document).scrollTop();
                if (scrollTop > 100) {
                    this.$target.fadeIn(1000);
                } else {
                    this.$target.fadeOut(1000);
                }
            }.bind(this));

            this.$target.on("click", function () {
                $(document).scrollTop(0);
            });

            this.$target.on("mouseover", function () {
                this.$target.css({
                    "border-color": "#31ccfd",
                    "color": "#31ccfd",
                });
            }.bind(this));

            this.$target.on("mouseout", function () {
                this.$target.css({
                    "border-color": "#fff",
                    "color": "#fff",
                });
            }.bind(this));
        }
    };

    return GoTop;
});


//goTop.init();
