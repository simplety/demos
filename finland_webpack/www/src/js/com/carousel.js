/**
 * Created by Kaisla on 15/08/2017.
 */
//var $ = require("jquery");
import $ from 'jquery';
console.log($);
debugger;
import Util from '../com/util'
debugger;

//全屏Carousel
function _Carousel($ct) {

    this.$ct = $ct;
    this.$imgWrap = this.$ct.find(".imgList");
    this.$imgList = this.$ct.find(".imgList>li");
    this.$anchorList = this.$ct.find(".anchor>li");

    this.imgWidth = $(window).outerWidth(); //注意宽度可变
    this.imgCount = this.$imgList.length;
    this.curIndex = 1;
    this.isAnimate = false;

    this.loadImg();
    this.init();
    this.bind();
}

_Carousel.prototype = {
    loadImg: function (){
        console.log("loadimg...");
        this.$ct.find(".imgList>li").each(function(index,li){
            var $li = $(li);
            $li.css("background-image","url("+$li.data('src')+")");
        });
    },
    //添加头尾两个li的副本 & 设置ul的宽度，使其能容纳所有节点；
    init: function () {
        console.log("load _Carousel");
        this.$ct.find(".imgList").width(this.imgWidth * (this.imgCount + 2));

        this.$imgWrap.css("left", -this.imgWidth);
        this.$imgList.eq(0).clone().appendTo(this.$imgWrap);
        this.$imgList.eq(-1).clone().prependTo(this.$imgWrap);

        //设置全屏
        this.$fullWindow = this.$ct.find(".full-window");
        this.$fullWindow.css("width", this.imgWidth);
    },
    //检查是第一个或是最后一个li，如果是的话立即跳转后设置锚点，否则直接设置锚点
    check: function (index) {
        if(typeof index != "number"){return};
        if (index == 0) {
            this.$imgWrap.css("left", -this.imgCount * this.imgWidth);
            this.curIndex = this.imgCount;
            console.log(this.curIndex);
            this.setAnchor(this.curIndex);
        }
        if (index == this.imgCount + 1) {
            this.$imgWrap.css("left", -this.imgWidth);
            this.curIndex = 1;
            console.log(this.curIndex);
            this.setAnchor(this.curIndex);
        }else{
            this.setAnchor(index);
        }
    },
    //添加几个按钮的监听函数
    bind: function () {
        $(window).on("resize",function(){
            console.log(Util);
            Util.throttle(function(){
                console.log("come in");
                this.imgWidth = $(window).outerWidth();
                this.$ct.find(".full-window").css("width",this.imgWidth);
                this.$imgWrap.css("left",-this.curIndex * this.imgWidth);
            },500,this);
        }.bind(this));
        this.$ct.find(".prev").on("click", function (e) {
            e.preventDefault();
            this.transit(-1);
        }.bind(this));
        this.$ct.find(".next").on("click", function (e) {
            e.preventDefault();
            this.transit(1);
        }.bind(this));
        this.$ct.find(".anchor").on("click", function (e) {
            var targetIndex = this.$anchorList.index($(e.target)) + 1,
                diff = targetIndex - this.curIndex;
            console.log("curIndex",this.curIndex);
            console.log("targetIndex",targetIndex);
            console.log("diff",diff);
            this.transit(diff);
        }.bind(this));

    },

    transit: function (count) {

        if(typeof count != "number") return;
        if(count == 0) return;
        if(this.isAnimate){
            console.log("isAnimate",this.isAnimate);
            return;
        }

        this.isAnimate = true;
        this.$imgWrap.animate({left: "-=" + (count * this.imgWidth)},1000,function(){
            this.curIndex += count;
            this.check(this.curIndex);
            this.isAnimate = false;
        }.bind(this));
        // this.isAnimate = false;
    },

    autoPlay: function (interval) {
        interval = interval || 3000;
        setInterval(this.transit.bind(this), interval);
    },

    setAnchor: function(index){
        this.$anchorList.removeClass("active")
            .eq(index-1).addClass("active");
    }

}
export default {
    init: function () {
        $(".carousel").each(function () {
            new _Carousel($(this));
        });
    }
}