$(document).ready(function(){
  var controller  = (function(){

    var i = 9;

 (function animateCards(){
      $(".card").each(function(index){
        $(this).css({transitionDelay:150*index+"ms"});
      })

      if(i === 3){
      $(".card").eq(0).addClass("deal-player-card-1");
      $(".card").eq(1).addClass("deal-card-3-1-1");
      $(".card").eq(2).addClass("deal-card-3-2-1");
      $(".card").eq(3).addClass("deal-player-card-2");
      $(".card").eq(4).addClass("deal-card-3-1-2");
      $(".card").eq(5).addClass("deal-card-3-2-2");
      }
      else if(i === 6){
        $(".card").eq(0).addClass("deal-player-card-1");
        $(".card").eq(1).addClass("deal-card-6-1-1");
        $(".card").eq(2).addClass("deal-card-6-2-1");
        $(".card").eq(3).addClass("deal-card-6-3-1");
        $(".card").eq(4).addClass("deal-card-6-4-1");
        $(".card").eq(5).addClass("deal-card-6-5-1");
        $(".card").eq(6).addClass("deal-player-card-2");
        $(".card").eq(7).addClass("deal-card-6-1-2");
        $(".card").eq(8).addClass("deal-card-6-2-2");
        $(".card").eq(9).addClass("deal-card-6-3-2");
        $(".card").eq(10).addClass("deal-card-6-4-2");
        $(".card").eq(11).addClass("deal-card-6-5-2");
      }
      else{
        $(".card").eq(0).addClass("deal-player-card-1");
        $(".card").eq(1).addClass("deal-card-8-1-1");
        $(".card").eq(2).addClass("deal-card-8-2-1");
        $(".card").eq(3).addClass("deal-card-8-3-1");
        $(".card").eq(4).addClass("deal-card-8-4-1");
        $(".card").eq(5).addClass("deal-card-8-5-1");
        $(".card").eq(6).addClass("deal-card-8-6-1");
        $(".card").eq(7).addClass("deal-card-8-7-1");
        $(".card").eq(8).addClass("deal-player-card-2");
        $(".card").eq(9).addClass("deal-card-8-1-2");
        $(".card").eq(10).addClass("deal-card-8-2-2");
        $(".card").eq(11).addClass("deal-card-8-3-2");
        $(".card").eq(12).addClass("deal-card-8-4-2");
        $(".card").eq(13).addClass("deal-card-8-5-2");
        $(".card").eq(14).addClass("deal-card-8-6-2");
        $(".card").eq(15).addClass("deal-card-8-7-2");
      }

      $("#player").css({"bottom":"-2%","left":"50%"});
      $("#user1").css({"bottom":"-2%","left":"17%"});
      $("#user2").css({"bottom":"40%","left":"-1%"});
      $("#user3").css({"bottom":"87%","left":"27%"});
      $("#user4").css({"bottom":"87%","left":"46%"});
      $("#user5").css({"bottom":"87%","left":"65%"});
      $("#user6").css({"bottom":"40%","left":"94%"});
      $("#user7").css({"bottom":"-2%","left":"74%"});
    })();


  })();
});
