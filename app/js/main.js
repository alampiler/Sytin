$(document).ready(function () {

/*Задаем класс для скрытого блока библиотеки*/
$('.video-js').addClass('hover');

/*Задаем ховер эффект и нажатие для видео и формы при разных разрешениях екрана*/
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

/*Плавный переход по якроям ссылок*/
  $("a[href*='#']").on("click", function(e){
    let this_elem = $(this);
    $('html, body').stop().animate({
      scrollTop: $(this_elem.attr('href')).offset().top
    }, 777);
    e.preventDefault();
    return false;
  });

  $(".order").on("click", function(e){
    let anchor = $("#presentation");
    $('html, body').stop().animate({
      scrollTop: $(anchor).offset().top
    }, 777);
    e.preventDefault();
    return false;
  });

/*Скролер на верх сайта*/
  $(window).scroll(function(){
    if ($(this).scrollTop() > 1400) {
      $('.scrollUp').fadeIn();
    } else {
      $('.scrollUp').fadeOut();
    }
  });

  $('.scrollUp').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });


 /*Меню для моб. екранов*/
$('#mob_btn').click(function () {
  $('.mobile_navbar').addClass('active');
});

  $('#exit').click(function () {
    $('.mobile_navbar').removeClass('active');
  });

/*Кастомные свойства фильтров библиотеки ion.rangeSlider*/
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


