/**
 * Created by Kaisla on 10/08/2017.
 */

Tab = (function(){
    function _Tab(container,tabConfig){
        this.baseConfig = {
            tabList : {
                title : "tab1",
                content : "content 1"
            },
            activeIndex : 0
        };
        this.container = container;
        this.tabConfig = Object.assign({},baseConfig,tabConfig)

        this.init();
        this.bind();
    }

    _Tab.prototype = {
        render: function(this.container){
            this.tabConfig = {
                this.tabList
            }
        },
        init: function(){
            console.log("container",this.container);
            this.tabTitleWrap = this.container.querySelector(".tab-nav");
            this.tabTitles = this.container.querySelectorAll(".tab-nav>li");
            this.tabContent = this.container.querySelectorAll(".tab-content>li");
        },
        bind: function(){
            var _this = this;
            this.tabTitleWrap.addEventListener("click",function(e){
                var target = e.target,
                    index = [].indexOf.call(_this.tabTitles,target);

                _this.tabTitles.forEach(function(li){
                    li.classList.remove("active");
                });
                target.classList.add("active");

                _this.tabContent.forEach(function(li){
                    li.classList.remove("active");
                })
                _this.tabContent[index].classList.add("active");
            });
        }
    }
    return {
        init: function(){
            document.querySelectorAll(".tab").forEach(function(element){
                new _Tab(element);
            })
        }
    }
})();

Tab.init();