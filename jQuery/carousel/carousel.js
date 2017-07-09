var width = $(".carousel").width();

$(".left").on("click", function() {
    var left = parseInt($(".carousel>.image").css("left"));
    $(".carousel>.image").css("left", left - width);
});
$(".right").on("click", function() {
    var left = parseInt($(".carousel>.image").css("left"));
    $(".carousel>.image").css("left", left + width);
});


