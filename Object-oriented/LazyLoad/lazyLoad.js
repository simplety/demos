/**
 * Created by Kaisla on 15/08/2017.
 */

function showImg($img){
    $img.attr("src",$img.attr("data-src"));
}

function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
        console.log("enter.");
    },100);
}

Exposure = (function(){
    //处理单个target
    function _Exposure($target,callback){
        this.$target = $target;
        this.callback = callback;
        this.bind();
        this.check();
    }

    _Exposure.prototype = {
        bind: function(){
            $(window).on("scroll",function(){
                throttle(this.callback,this);
            }.bind(this));
        },
        //检查目标元素是否在视窗内
        isShow: function(){
            var scrollHeight = $(document).scrollTop(), //滚动条高度
                windowHeight = $(window).height(),  //窗口高度
                Height = this.$target.offset().top;  //到根节点高度
            if((scrollHeight < Height) && (Height < scrollHeight + windowHeight)){
                return true;
            }else{
                return false;
            }
        },
        check: function(){
            this.isShow() && this.callback();
        }
    }

    return {
        init: function($targets,callback){
            $targets.each(function(index,img){
                new _Exposure($(img),function(){
                    callback($(img));
                });
            })
        }

    }
})();

Exposure.init($(".img-view img"),showImg);