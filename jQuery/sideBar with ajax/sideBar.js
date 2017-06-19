/**
 * Created by Kaisla on 16/06/2017.
 */
$("ul.firstTitle>li>a").on("mouseover", function() {
    $this = $(this);
    $this.siblings("ul.secondTitle").addClass("active");
    console.log($this.val());
    $.ajax({
        dataType: "json",
        url: "/nav",
        method: "GET",
        data: {
            barID: $this.attr("data-id")
        },
        success: function(response) {
            $this.siblings("ul.secondTitle").empty();
            response.forEach(function(elem, index) {
                $("ul.secondTitle").append("<li>" + elem + "</li>")
            })
        }
    });
})
$("ul.firstTitle>li>a").on("mouseout", function() {
    $this = $(this);
    $this.siblings("ul.secondTitle").removeClass("active");
})
