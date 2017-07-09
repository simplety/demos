const length = 5;
$("button").on("click",function(){
  $.ajax({
    "url": "/getNews",
    "method": "get",
    "data-type": "json",
    "data": {
      "length": length,
      "index": $("ul>li").length+1,
    },
  }).done(function(response){
    console.log("success:",response);
    for(let i = 0; i < response.length; i++){
      $("ul").append("<li>"+ response[i] +"</li>")
    }
  }).fail(function(){
    console.log("error");
  });
})
