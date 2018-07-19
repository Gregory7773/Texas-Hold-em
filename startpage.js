$(document).ready(function(){
  $(document).scroll(animateBar);
  $(document).scroll(animateSeparator);


  function animateBar(){

    if($(window).scrollTop() > 70){
      $("nav").addClass("animateNav");
      $(".horizontal_nav").addClass("animate_hor_bar");
      $("button").addClass("animateButton");
      $(".vertical_nav").addClass("after_animate_vertical_nav");
      $(".vertical_nav_option").addClass("after_animate_nav_option");
      $(".vertical_a").addClass("after_animate_a");

    }
    else{
      $("nav").removeClass("animateNav");
      $(".horizontal_nav").removeClass("animate_hor_bar");
      $("button").removeClass("animateButton");
      $(".vertical_nav").removeClass("after_animate_vertical_nav");
      $(".vertical_nav_option").removeClass("after_animate_nav_option");
      $(".vertical_a").removeClass("after_animate_a");
    }
  }

  function animateSeparator(){
    var sep = $(".separator_1");
    if ((($(window).height()+$(window).scrollTop()) > sep.offset().top) && ($(window).scrollTop() < $(window).height())) {
        var i = ($(window).scrollTop() - (sep.offset().top - $(window).height()))*0.675;
        sep.css("left", i);
        $(".separator_2").css("right", i);
    }
  }

});
