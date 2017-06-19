var products = [
  {
    img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
    name: '珂兰 黄金手 猴哥款',
    price: '￥405.00'
  },{
    img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
    name: '珂兰 黄金转运珠 猴哥款',
    price: '￥100.00'
  },{
    img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
    name: '珂兰 黄金手链 3D猴哥款',
    price: '￥45.00'
  }
];
$('.add-product').on("click",function(){
  $.each(products,function(index,value){
    $(".pro-list").append(createProdHtml(value));
  })
})
function createProdHtml(obj){
  var html = "<li class=\"product\">"
  html += "<div class=\"cover\"><a>立即抢购</a></div>"
  html += "<a href=\"#\" class=\"detail\">"
  html += "<img src=\""+ obj.img + "\">"
  html += "<h4 class=\"pro-name\">" + obj.name + "</h4>"
  html += "<p class=\"pro-price\">" + obj.price + "</p>"
  console.log(html);
  return html;
}
