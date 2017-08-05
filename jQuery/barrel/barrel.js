/**
 * Created by Kaisla on 01/08/2017.
 */
function Barrel($container) {
    this.$view = $container;
    this.rowWidth = $container.outerWidth();
    this.rowInfo = [];
    this.baseHeight = 100;
    this.horiPadding = 5;
    this.widthSum = 0;
    this.loadImgs(50);
}

Barrel.prototype = {
    loadImgs : function(count){
        var imgUrls = this.getImgUrls(count),
            _this = this;
        imgUrls.forEach(function(url){
            var img = new Image();
            img.src = url;
            img.onload = function() {
                var imgInfo = {
                    element: img,
                    width: img.width / img.height * _this.baseHeight,
                    height: _this.baseHeight,
                };
                _this.render(imgInfo);
            }
        });
        imgUrls.
    },
    render: function(imgInfo){
        this.rowInfo.push(imgInfo);
        this.widthSum += imgInfo.width + this.horiPadding;
        console.log("widthSum",this.widthSum);
        if(this.widthSum > this.rowWidth){
            this.rowInfo.pop();
            this.layout(this.widthSum - imgInfo.width - this.horiPadding);
            this.rowInfo = [];
            this.rowInfo.push(imgInfo);
            this.widthSum = imgInfo.width + this.horiPadding;
        }else if(this.widthSum == this.rowWidth){
            this.layout(this.widthSum);
            this.rowInfo = [];
        }

    },
    layout : function(widthSum){
        var $imgRowWrap = $("<div class='img-row'></div>");
        $imgRowWrap.appendTo(this.$view);
        $imgRowWrap.height(this.baseHeight * this.rowWidth / widthSum)
        this.rowInfo.forEach(function(obj){
            console.log($(obj.element));
            $(obj.element).css("paddingLeft",this.horiPadding).appendTo($imgRowWrap);
        })
    },
    getImgUrls : function(count) {
        count = count || 10;
        var urls = [];
        for (i = 0; i < count; i++) {
            var width = Math.floor(Math.random() * 100) + 50,
                height = Math.floor(Math.random() * 30) + 50;
            urls.push("https://unsplash.it/" + width + "/" + height + "/");
        }
        return urls;
    }
}
barrel = new Barrel($(".img-preview"));
