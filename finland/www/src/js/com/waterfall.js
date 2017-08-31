/**
 * Created by Kaisla on 31/08/2017.
 */

define(["jquery","com/exposure"], function ($,Exposure) {

    function _Waterfall($ct) {
        this.init($ct);
        this.bind();
        // this.getOnePage(this.curPage,function(){
        //     this.curPage++;
        // });
        // Exposure.init(this.$ct.siblings("p"),function(){
        //     console.log("come in exposure")
        //     this.$ct.siblings("p").css("color","red");
        // }.bind(this));

    }

    _Waterfall.prototype = {
        init: function ($ct) {
            this.$ct = $ct;
            this.url = $ct.data("src") || "http://platform.sina.com.cn/slide/album_tech";
            this.newsCount = 10;
            this.newsWidth = 300;

            this.curPage = 1;
            this.flowCount = Math.floor(this.$ct.width() / this.newsWidth);
            this.newsHeight = new Array(this.flowCount);
            this.newsHeight.fill(0);

            this.createColumns(this.flowCount);
        },
        bind: function(){
            Exposure.init(this.$ct.find(".hiddenFooter"),function(){
                this.getOnePage(this.curPage,function(){
                    this.curPage++;
                });
            }.bind(this));
        },
        createColumns: function(flowCount){
            var $ul = $("<ul></ul>").appendTo(this.$ct),
                $li = $("<li></li>");
            this.$ct.append("<div class='hiddenFooter'></div>");

            for(var i=0;i<flowCount;i++){
              $ul.append($li.clone());
            };
        },

        requestNews: function (url,number,curPage) {
            var url = url || this.url || "#",
                number = number || this.newsCount || 8,
                curPage = curPage || this.curPage || 1;

            return $.ajax({
                url: url,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                jsoncallback: "func",
                data: {
                    app_key: 1271687855,
                    num: number,
                    page: curPage,
                },
            });

        },
        getOnePage: function(curPage,success){
            this.requestNews().done(function(response){
                var newsList = response.data,
                    loadedCount = 0;
                $.each(newsList, function (index, news) {
                    var $node = this.getNode(news);
                    $node.find("img").on("load", function () {
                        loadedCount += 1;
                        this.waterfallPlace($node);
                        if(loadedCount == newsList.length){
                            success && success();
                        }
                    }.bind(this));
                }.bind(this));
            }.bind(this));

        },
        getNode: function (news){
            var url = news.img_url || "#",
                name = news.short_name || news.name || "Title",
                intro = news.short_intro || news.intro || "Introduction.";

            $news = $("<div></div>")
                .addClass("news")
                .append("<img>").append("<h3></h3>").append("<p></p>")

            $news.children("img").attr("src", url)
                .siblings("h3").text(name)
                .siblings("p").text(intro);

            return $news;
        },
        waterfallPlace: function ($node) {
            // console.log($node);
            var minValue = Math.min.apply(null, this.newsHeight),
                minIndex = this.newsHeight.indexOf(minValue);
            // console.log(this.$ct.find("li")[minIndex]);
            this.$ct.find("li").eq(minIndex).append($node);
            this.newsHeight[minIndex] += $node.outerHeight(true);
        },
    }

    return {
        init: function($targets){
            $targets.each(function(index,target){
                new _Waterfall($(target));
            })
        }
    }

});