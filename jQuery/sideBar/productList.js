$(".menu-tab>li").on("click",function(){
  var $this = $(this)
  var index = $this.index()
  $this.addClass("active")
    .siblings().removeClass("active")
    .parents("ul.menu-tab").siblings(".menu-ct").children().hide()
    .eq(index).show();
  // $("ul.menu-tab").children("li.product").siblings().hide()
  //   .eq(2).show();
});

$(".product").on("mouseover",function(){
  $(this).children(".cover").show()
});
$(".product").on("mouseout",function(){
  $(this).children(".cover").hide();
});
