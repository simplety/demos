var clock;
$(window).on("scroll", function(){
  if(clock){
    clearTimeout(clock);
  }
  clock = setTimeout(lazyRender,300);
});
lazyRender();
function lazyRender(){
  console.log("hey");
  $("img").each(function(index){
    $this = $(this);
    if(isVisible($this) && !isLoaded($this)){
      loadImg($this);
    }
  });
}
function isVisible($node) {
  var scrollTop = $(document).scrollTop();
  var top = $node.offset().top;
  var winHeight = $(window).height();
  if (top < (scrollTop + winHeight) && top > scrollTop)
      return true;
}
function isLoaded($node){
  return $node.attr("src") === $node.attr("data-src");
}
function loadImg($node){
  var dataSrc = $node.attr("data-src");
  $node.attr("src",dataSrc);
}
