/**
 * Created by Kaisla on 30/08/2017.
 */
//入口模块

// define(['jquery',"com/goTop","com/carousel"],function($,GoTop,Carousel){
//     new goTop();
// })

import "../../css/base.css";
import "../../css/index.css";
import Iconfont from '../com/iconfont'
import GoTop from "../com/goTop"
import Carousel from "../com/carousel"
import Exposure from "../com/exposure"

Carousel.init();
Iconfont.init();
new GoTop();