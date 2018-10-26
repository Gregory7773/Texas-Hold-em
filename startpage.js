

$(document).ready(function(){
  var number_of_players_in_game;
  $(document).scroll(animateBar);
  $(document).scroll(animateSeparator);
  $(document).scroll(function(){
    if($(window).scrollTop() > $(window).height()-100){
      animateStart();
    };
  });
  $("svg").click(function(){slideshow(event);});
  $("#section_1_next_butt").click(nextSection);
  $('.players').on({"click":function(){
    number_of_players_in_game = $(this).attr("id");
    localStorage.setItem('number',number_of_players_in_game);
    $(".players").css("color","#cccccc");
    $(this).css("color","#ffffff");
  },
    "mouseenter":function(){
      $(this).css("backgroundColor","#888888");
  },
    "mouseleave":function(){
      $(this).css("backgroundColor","#5c5c59");
  }
});


  var counter = 1;



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
    if($(".separator_1").position().left + 340 < $(window).width()/2){
    var sep = $(".separator_1");
    if (($(window).height()+$(window).scrollTop()) > sep.offset().top){
        var i = ($(window).scrollTop() - (sep.offset().top - $(window).height()))*0.675;
        sep.css("left", i);
        $(".separator_2").css("right", i);
    };
  };
}

  function slideshow(ev) {

    var width_of_slide = $(".location").width();
    var slides = $(".location_container");
    if($(ev.target).attr("class") === "right_arrow"){
        $("#main_container").animate({"marginLeft": "-=" + width_of_slide},200,function(){
          counter++;
          if(counter == slides.length ){
            counter = 1;
            $("#main_container").css("marginLeft", "0");
          }
        });
      }
    else{
        $("#main_container").animate({"marginLeft": "+=" + width_of_slide},200,function(){
          if(counter == 1 ){
            counter = 9;
            $("#main_container").css("marginLeft", -(slides.length-2)*width_of_slide+"px");
          }
          counter--;});
    }
  }

  function animateStart(){
    $("#section_1_header").animate({opacity: 1, top: "10vh"},1000);
    $("#section_1_container").delay(400).animate({opacity: 1, top: "18vh"},1000);
    $("#section_1_container_next").delay(400).animate({opacity: 0.8, top: "62vh"},1000);
  }

  function nextSection(){
    $("#section1").css({"transform": "translateX(-100%)", "opacity": "0"});
    $("#section2").css({"transform": "translateX(-100%)", "opacity": "1"});
  }


});
