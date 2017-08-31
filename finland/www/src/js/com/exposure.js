/**
 * Created by Kaisla on 31/08/2017.
 */

define(["jquery", "com/util"], function ($, Util) {

    function _Exposure($target, callback) {
        this.$target = $target;
        this.callback = callback;
        this.bind();
        this.check();
    }

    _Exposure.prototype = {
        bind: function () {
            $(window).on("scroll", function () {
                Util.throttle(this.callback, undefined, this);
            }.bind(this));
        },
        //检查目标元素是否在视窗内
        isShow: function () {
            var scrollHeight = $(document).scrollTop(), //滚动条高度
                windowHeight = $(window).height(),  //窗口高度
                Height = this.$target.offset().top;  //到根节点高度
            if ((scrollHeight < Height) && (Height < scrollHeight + windowHeight)) {
                return true;
            } else {
                return false;
            }
        },
        check: function () {
            this.isShow() && this.callback();
        }
    }

    return {
        init: function ($targets, callback) {
            $targets.each(function (index, target) {
                new _Exposure($(target), callback);
            });
        },
    }
});