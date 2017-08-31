/**
 * Created by Kaisla on 30/08/2017.
 */
//入口模块

// define(['jquery',"com/goTop","com/carousel"],function($,GoTop,Carousel){
//     new goTop();
// })

define(["jquery", "com/iconfont", "com/goTop", "com/carousel"],
    function ($, Iconfont, GoTop, Carousel, Exposure) {
        Carousel.init();
        Iconfont.init();
        new GoTop();
    }
);