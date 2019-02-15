$(document).ready(function () {

$('.video-js').addClass('hover');

if($(window).width() > 1024){
  $('.hover').hover(function () {
    $('.hover').removeClass('active');
    $(this).addClass('active');
  });
}
else if ($(window).width() < 1024 && $(window).width() > 900) {
  $('.hover').click(function () {
    $('.hover').removeClass('active');
    $(this).addClass('active');
  });
}
else{
  $('.hover').removeClass('active');
}

$('#mob_btn').click(function () {
  $('.mobile_navbar').addClass('active');
});

  $('#exit').click(function () {
    $('.mobile_navbar').removeClass('active');
  });


  $("#filer_price").ionRangeSlider({
    type: "double",
    grid: false,
    hide_min_max: false,
    min: 260,
    max: 400,
    from: 0,
    to: 400,
  });

  $("#filer_square").ionRangeSlider({
    type: "double",
    grid: false,
    hide_min_max: false,
    min: 260,
    max: 400,
    from: 0,
    to: 400,
  });
});


