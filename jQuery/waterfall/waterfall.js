/**
 * Created by Kaisla on 17/07/2017.
 */
// initialize
const newsCount = 10,
      newsWidth = $(".news").outerWidth(true);
var curPage = 1,
    flowCount = Math.floor($(".waterfall").width()/newsWidth),
    newsHeight = new Array(flowCount),
    isDataArrived = true;
console.log("flowCount",flowCount);
newsHeight.fill(0);

getNews();

$(window).on("scroll",function(){
    if(isVisible($("#hidden-footer"))){
        getNews();
    }
});

function getNews(){
    $.ajax({
        url: "http://platform.sina.com.cn/slide/album_tech",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        jsoncallback: "func",
        data: {
            app_key: 1271687855,
            num: newsCount,
            page: curPage,
        },
        success: function(response){
            if(response && response.status && response.status.code === "0"){
                handleData(response.data);
                curPage++;
            }else{
                console.log("get error response.")
            }
        },
    });
    function handleData(newsList){
        isDataArrived = false;
        $.each(newsList,function(index,news){
            var $node = getNode(news);
            $node.find("img").on("load",function(){
                console.log("img loaded");
                $(".waterfall").append($node);
                waterfallPlace($node);
            })
        })
    }
}
function getNode(news){
    $li = $("<li></li>")
        .addClass("news")
        .append("<img>").append("<h3></h3>").append("<p></p>")

    $li.children("img").attr("src", news.img_url)
        .siblings("h3").text(news.short_name)
        .siblings("p").text(news.short_intro);

    return $li;
}
function waterfallPlace($node){
    var minValue = Math.min.apply(null,newsHeight),
        minIndex = newsHeight.indexOf(minValue);
    $node.css({
        left: minIndex*newsWidth,
        top: minValue,
    });
    newsHeight[minIndex] += $node.outerHeight(true);
    //防止ul塌陷
    $(".waterfall").css("height",Math.max.apply(null,newsHeight))
}
function isVisible($elem){
    var scrollH = $(window).scrollTop(),
        top = $elem.offset().top,
        winH = $(window).height();
    if((top < scrollH + winH) && (top > scrollH)){
        return true;
    }else{
        return false;
    }
}