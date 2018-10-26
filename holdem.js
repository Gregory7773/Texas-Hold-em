'use strict';

$(document).ready(function(){
  var number_of_players_in_game = Number(localStorage.getItem('number'));
  if(number_of_players_in_game ==2){
    var i = 0;
    var raise_index = 0;
    var counter = 0;
    var back_call = 65
    var pre_flop = "start";
  }
  else{
    var i = 3;
    var raise_index = 3;
    var counter = 3;
  }

  var iteration = 0;
  var players = [];
  var pot = 0;
  var current_call = 65;
  var back_call;
  var sound = new Audio("duet.mp3");


  var InitPositions = (function(){
    function initPosCards(){
      if( number_of_players_in_game=== 2){
      $(".card").eq(0).addClass("deal-player-card-1");
      $(".card").eq(1).addClass("deal-card-3-1-1");
      $(".card").eq(2).addClass("deal-player-card-2");
      $(".card").eq(3).addClass("deal-card-3-1-2");

}
      else if(number_of_players_in_game === 6){
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
    }

    function initPosPlayers(){
      if(number_of_players_in_game == 2){
        $("#player").css({"bottom":"-2%","left":"44%"});
        $("#user1").css({"bottom":"89%","left":"39%"});
      }
      else if(number_of_players_in_game == 6){
        $("#player").css({"bottom":"-2%","left":"50%"});
        $("#user1").css({"bottom":"1%","left":"17%"});
        $("#user2").css({"bottom":"89%","left":"15%"});
        $("#user3").css({"bottom":"91%","left":"43%"});
        $("#user4").css({"bottom":"91%","left":"75%"});
        $("#user5").css({"bottom":"0%","left":"73%"});
      }
      else{
        $("#player").css({"bottom":"-2%","left":"50%"});
        $("#user1").css({"bottom":"1%","left":"17%"});
        $("#user2").css({"bottom":"40%","left":"8%"});
        $("#user3").css({"bottom":"91%","left":"11%"});
        $("#user4").css({"bottom":"91%","left":"43%"});
        $("#user5").css({"bottom":"91%","left":"88%"});
        $("#user6").css({"bottom":"40%","left":"94%"});
        $("#user7").css({"bottom":"1%","left":"74%"});
      }
    }

    function initPosCoins(){
      if(number_of_players_in_game == 2){
        $("#user-1-coins").css({"top":"139%","left":"52%"});
        $("#user-2-coins").css({"top":"114%","left":"10%"});
      }
      else if(number_of_players_in_game == 6){
        $("#user-1-coins").css({"top":"139%","left":"52%"});
        $("#user-2-coins").css({"top":"114%","left":"10%"});
        $("#user-3-coins").css({"top":"34%","left":"-6%"});
        $("#user-4-coins").css({"top":"-10%","left":"10%"});
        $("#user-5-coins").css({"top":"-23%","left":"70%"});
        $("#user-6-coins").css({"top":"-8%","left":"110%"});
      }
      else{
        $("#user-1-coins").css({"top":"139%","left":"52%"});
        $("#user-2-coins").css({"top":"114%","left":"10%"});
        $("#user-3-coins").css({"top":"34%","left":"-6%"});
        $("#user-4-coins").css({"top":"-10%","left":"10%"});
        $("#user-5-coins").css({"top":"-23%","left":"70%"});
        $("#user-6-coins").css({"top":"-8%","left":"110%"});
        $("#user-7-coins").css({"top":"57%","left":"115%"});
        $("#user-8-coins").css({"top":"120%","left":"96%"});
      }
    }

    return {
      initialPositions: function(){
        initPosPlayers();
        initPosCoins();
      },
      resetCoinsAnimation:function(){
        $(".user-coins").empty();
        $(".coins-pot-wrapper").empty();
        initPosCoins();

      },
      initCardsPositions: function(){
        initPosCards();
      }
    }

  })();

  var UserInterface = (function(){


    var animateCards = function(){
      $(".card").each(function(index){
        $(this).css({transitionDelay:150*index+"ms"});
          })
    };


    return{
      displayUsers:function(){
        for(var i=1;i<number_of_players_in_game;i++){
          $(".container").append(  '<div class = "user-container" id = "user'+i+'"><div class = "inner-user-container"><div class = "player-decision">FOLD</div><img src = "images/Daniel-Negreanu.jpg"><div class = "user-cash-container">1000</div></div></div>')
        }
        $('.player-decision').toggle();
      },
      showPlayerCards: function(){
        var insertCardHTML = '<img class = "card" id="'+players[0].Card1x+'-'+players[0].Card1y+'" src = "images/cards/'+players[0].Card1x+'-'+players[0].Card1y+'.png">';
        $("#player").before(insertCardHTML);

        for(var i = 1 ; i< (number_of_players_in_game);i++){
          $("#player").before('<img class = "card" id="'+players[i].Card1x+'-'+players[i].Card1y+'" src = "images/cards/card back.png">');
        }
        insertCardHTML = '<img class = "card" id="'+players[0].Card2x+'-'+players[0].Card2y+'" src = "images/cards/'+players[0].Card2x+'-'+players[0].Card2y+'.png">';
        $("#player").before(insertCardHTML);

        for(var i = 1 ; i< (number_of_players_in_game);i++){
          $("#player").before('<img class = "card" id="'+players[i].Card2x+'-'+players[i].Card2y+'" src = "images/cards/card back.png">');
        }
        animateCards();
      },
      toggleButtons: function(players){
        if(current_call == -1){
          $("#check").toggle();
          $("#raise").toggle();
        }
        else if(current_call >= players[0].money){
          $("#fold").toggle();
          $("#all_in").toggle();
        }
        else{
          $("#fold").toggle();
          $("#call").toggle();
          $("#raise").toggle();

        }
      },
      flop: function(cards,iteration){
        if(iteration == 1){
          for (var i = 0; i < 3; i++) {
            $(".common-card").eq(i).css({opacity:1,left:110*i+"px"});
          }
        }
        else if(iteration == 2){
          $(".common-card").eq(3).css({opacity:1,left:330+"px"});
        }
        else{
          $(".common-card").eq(4).css({opacity:1,left:440+"px"});
        }
      },
      showPlayerDecision: function(current_call,back_call,player_num = 0){
        $(".player-decision").eq(player_num).remove();
        $(".inner-user-container").eq(player_num).prepend("<div class = 'player-decision'></div>");
        var element = $(".player-decision").eq(player_num);
        if(players[player_num].all_in == true){
          element.html("ALL IN");
        }
        else if(players[player_num].fold == true){
          element.html("FOLD");
        }
        else if(back_call == -1){
          element.html("CHECK");
        }
        else if(back_call == current_call){
          element.html("CALL");
        }
        else if(back_call>current_call){
          element.html("RAISE");
        }
      },
      animateCoins:function(){
        $(".coins_wrapper").css({"top":"80%","left":"55%"});
        $(".user-coins .coin").css({transform: "scale(0.5,0.5)"});
      },
      updatePotValue:function(){
        $(".pot").html("$"+pot);
      },
      updatePlayerMoney:function(player_id){
          $(".user-cash-container").eq(player_id).html( players[player_id].money);
      },
      clearPotCoins:function(){
        $(".coins-pot-wrapper").empty();
      },
      updateMoneySliderMaxValue:function(){
        $("#money-slider").attr("max",players[0].money);
      },
      updateRiseValue: function(){
        var val = $("#money-slider").val();
        $("#raise").html("RAISE "+val);
      },
      displayWinningCards:function(winners){
        var iteration_number = 0;
        var player;
        $(".card").css("transitionDelay","0ms");
        (function Repeat(){
          player = winners[iteration_number];
          setTimeout(function(){
            var card1 = players[player].Card1x+"-"+players[player].Card1y;
            var card2 =  players[player].Card2x+"-"+players[player].Card2y;
            $("#"+card1).attr('src',"images/cards/"+players[player].Card1x+'-'+players[player].Card1y+".png");
            $("#"+card2).attr('src',"images/cards/"+players[player].Card2x+'-'+players[player].Card2y+".png");
            $(".common-card").css("opacity","0.3");
            $(".card").eq(player).css("opacity","0.3");
            $(".card").eq(player+number_of_players_in_game).css("opacity","0.3");
            players[player].hand_cards.forEach((element)=>{
              $("#"+element).css({"opacity":"1"});
          });
          if(player==0){
            $(".deal-player-card-1").css({left:"+="+30,bottom:"-="+11,transform:"rotate(0deg)"});
            $(".deal-player-card-2").css({left:"-="+30,bottom:"+="+11,transform:"rotate(0deg)"});
          }
          else{
            $(".deal-card-"+number_of_players_in_game+"-"+player+"-1").css({left:"+="+30,bottom:"-="+13,transform:"rotate(0deg)"});
            $(".deal-card-"+number_of_players_in_game+"-"+player+"-2").css({left:"-="+30,bottom:"+="+13,transform:"rotate(0deg)"});
          }
          iteration_number++;
          if(iteration_number<winners.length){Repeat();}
        },2000);
      })();
      }
    }
  })();
  function ifPlayerDontWantToCheck(current_call){
    if(current_call == -1){
      return 65;
    }
    else{
      return current_call;
    }
  }
  function pushCardsToPlayersHand(hand_numbers,cards,player){
    player.hand_cards = [];
    for (var i = 1; i < hand_numbers.length; i++) {
      cards.forEach((element)=>{
        if(hand_numbers[i] <10){
          if(hand_numbers[i] == element.substr(0,1)){
            player.hand_cards.push(element);
          }
        }
        else{
          if(hand_numbers[i] == element.substr(0,2)){
            player.hand_cards.push(element);
          }
        }
      })
    }
    console.log("Gracz: "+players.indexOf(player)+"  "+player.hand_cards);
  }

function pushCardsToPlayersHandForStraightAndFlush(hand_numbers,suit_number,cards,player){
  player.hand_cards = [];
  if(suit_number != false){
    //for flush,straight_flush,royal_flush
    for (var i = 1; i < hand_numbers.length; i++) {
        for(var j=0;j<cards.length;j++){
          if(hand_numbers[i]+"-"+suit_number == cards[j]){
            player.hand_cards.push(cards[j]);
            break;
        }
      }
    }
  }
  else{
    //for straight
    for (var i = 1; i < hand_numbers.length; i++) {
      if(hand_numbers[i]<10){
        for(var j=0;j<cards.length;j++){
          if(hand_numbers[i] == cards[j].substr(0,1)){
          player.hand_cards.push(cards[j]);
            break;
        }
      }
    }
      else{
          for(var j=0;j<cards.length;j++){
            if(hand_numbers[i] == cards[j].substr(0,2)){
              player.hand_cards.push(cards[j]);
              break;
          }
        }
      }
    }
  }
  console.log("Gracz: "+players.indexOf(player)+"  "+player.hand_cards);
}
  function removeRepeatingKickers(players_hand_strength,kickers){
    for (let i = 1; i < players_hand_strength.length; i++) {
      do{
        var is_repeat = false;
        for (let j = 0; j < kickers.length; j++) {
          if(kickers[j] == players_hand_strength[i]){
            kickers.splice(j,1);
            is_repeat = true;
            break;
          }
        }
      }
      while(is_repeat);

    }
    return kickers;
  }
  function removeRepeatingKickersForStraight(numbers){
    var is_repeat = false;
    do{
      for (var i = 0; i < numbers.length; i++) {
        if(numbers[i] == numbers[i+1]){
          numbers.splice(i,1);
          is_repeat = true;
          break;
        }
      }
    }
    while(is_repeat)
    return numbers;
  }
  var IdentifyPokerHands = function(community_cards_arr,player_number,iteration,current_call){
    var numbers = [];
    var colors = [];
    var cards = [];
    var repeating_numbers = [];
    var flush_number;
    var how_many_pairs = 0;
    var is_straight = 0;
    var is_flush = 0;
    var new_kickers = [];
    var community_cards= [];
    var hands = {
      highest_card:[false],
      one_pair:[false],
      two_pairs:[false],
      three_of_a_kind:[false],
      straight:[false],
      flush:[false],
      full_house:[false],
      four_of_a_kind:[false],
      straight_flush:[false],
      royal_flush:[false]
    };
    var player = players[player_number];

    for (var i = 0; i < community_cards_arr.length; i++) {
      community_cards[i] = community_cards_arr[i];
    }

    numbers.push(player.Card1x);
    numbers.push(player.Card2x);
    colors.push(player.Card1y);
    colors.push(player.Card2y);

    for(let i = 0;i<13;i++){
      repeating_numbers[i] = 0;
    };
    if(iteration == 1){
      community_cards.splice(3,2);
    }
    else if(iteration == 2){
      community_cards.splice(4,1);
    }

    //create new array with common cards and user's cards
    community_cards.forEach((element)=>{cards.push(element)});
    var player_card1 = player.Card1x.toString();
    player_card1 += "-"+player.Card1y.toString();
    var player_card2 = player.Card2x.toString();
    player_card2 += "-"+player.Card2y.toString();
    cards.push(player_card1,player_card2);

    for(let i = 0;i<community_cards.length;i++){
      var card = community_cards[i].split("-");
      numbers.push(Number(card[0]));
      colors.push(Number(card[1]));
    };


  for( let i = 0;i<numbers.length;i++){
    for(let j = 2;j<15;j++){
      if(numbers[i] == j){
        repeating_numbers[j-2] += 1;
        break;
      }
    }
  }
  //sort numbers array decreasing
  numbers.sort((a,b)=> b-a);
  //highest_card
    hands.highest_card[0] = true;
    for (var i = 1; i < 6; i++) {
      hands.highest_card[i] = numbers[i];
    }
    pushCardsToPlayersHand(hands.highest_card,cards,player);





  //One pair
  for(let i = 0;i<repeating_numbers.length;i++){
    if(repeating_numbers[i] == 2){
      hands.one_pair[0] = true;
      hands.one_pair[1] = i+2;
    }
  }
  if(hands.one_pair[0] == true){
    new_kickers = removeRepeatingKickers(hands.one_pair,numbers);
    for (let j = 0; j < 3; j++) {
      hands.one_pair[j+2] = new_kickers[j];
      }
    pushCardsToPlayersHand(hands.one_pair,cards,player);
  }

  //two pairs
  for(let i = 0;i<repeating_numbers.length;i++){
    if(repeating_numbers[i] == 2){
      how_many_pairs += 1;
      hands.two_pairs[how_many_pairs] = i+2
      if(how_many_pairs == 2){
        hands.two_pairs[0] = true;
        let x = hands.two_pairs[1];
        hands.two_pairs[1] = hands.two_pairs[2];
        hands.two_pairs[2] = x;
      }
    }
  };
  if(hands.two_pairs[0] == true){
    new_kickers = removeRepeatingKickers(hands.two_pairs,numbers);
    hands.two_pairs[3] = new_kickers[0];
    pushCardsToPlayersHand(hands.two_pairs,cards,player);
  }


  //three of a kind
  for(let i = 0;i<repeating_numbers.length;i++){
    if(repeating_numbers[i] == 3){
      hands.three_of_a_kind[0] = true;
      hands.three_of_a_kind[1] = i+2;
    }
  };
  if(hands.three_of_a_kind[0] == true){
    new_kickers = removeRepeatingKickers(hands.three_of_a_kind,numbers);
    for (let j = 0; j < 2; j++) {
      hands.three_of_a_kind[j+2] = new_kickers[j];
    }
    pushCardsToPlayersHand(hands.three_of_a_kind,cards,player);
  }

  //straight
  new_kickers = removeRepeatingKickersForStraight(numbers);
    for(let i = 0;i<new_kickers.length;i++){
      if(is_straight == 4){
          hands.straight[0] = true;
          for (var j = 1; j < 6; j++) {
            hands.straight[j] = new_kickers[(i-5)+j];
          }
          pushCardsToPlayersHandForStraightAndFlush(hands.straight,false,cards,player);
          break;
      }
      else{
        if(new_kickers[i] == new_kickers[i+1]+1){
          is_straight++;
        }
        else{
          is_straight = 0;
        }
      }
    }

  //sort colors increasing
  colors.sort(function(a,b){return a-b;});
  //flush
  for(let i = 0;i<colors.length;i++){
    if(is_flush == 4){
        hands.flush[0] = true;
        for (var j = 0; j < 5; j++) {
          hands.flush[j+1] = numbers[j];  }
        flush_number = colors[i];
        pushCardsToPlayersHandForStraightAndFlush(hands.flush,flush_number,cards,player);
        break;
    }
    else{
      if(colors[i] == colors[i+1]){
        is_flush++;
      }
      else{
        is_flush = 0;
      }
    }
  }

// full house
if(hands.one_pair[0] == true && hands.three_of_a_kind[0] == true){
  hands.full_house[0] = true;
  hands.full_house[1] = hands.three_of_a_kind[1];
  hands.full_house[2] = hands.one_pair[1];
  pushCardsToPlayersHand(hands.full_house,cards,player);
}
//four_of_a_kind
for(let i = 0;i<repeating_numbers.length;i++){
  if(repeating_numbers[i] == 4){
    hands.four_of_a_kind[0] = true;
    hands.four_of_a_kind[1] = i+2;
  }
}
if(hands.four_of_a_kind[0] == true){
  new_kickers = removeRepeatingKickers(hands.four_of_a_kind,numbers);
  hands.four_of_a_kind[2] = new_kickers[0];
  pushCardsToPlayersHand(hands.four_of_a_kind,cards,player);
}
//straight flush and royal flush
if(hands.straight[0] == true && hands.flush[0] == true){
  hands.straight_flush[0] = true;
  if(hands.straight[1] == 14){
    hands.royal_flush[0] = true;
  }
  pushCardsToPlayersHandForStraightAndFlush(hands.straight,flush_number,cards,player);
}

//how much money bet

  let back_call = 0;
    if(hands.royal_flush[0] ==true){
      player.user_hand = "royal_flush";
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" royal_flush" );
      back_call = player.money;
      player.all_in = true;
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }
    else if(hands.straight_flush[0] ==true){
      player.user_hand = "straigth_flush";
      hands.straight_flush.shift();
      player.cardsStrengthArray = hands.straigth_flush;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" straigth_flush" );
      back_call = player.money;
      player.all_in = true;
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }
    else if(hands.four_of_a_kind[0] ==true){
      player.user_hand = "four_of_a_kind";
      hands.four_of_a_kind.shift();
      player.cardsStrengthArray = hands.four_of_a_kind;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" four_of_a_kind" );
      back_call = player.money;
      player.all_in = true;
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }
    else if(hands.full_house[0] ==true){
      player.user_hand = "full_house";
      hands.full_house.shift();
      player.cardsStrengthArray = hands.full_house;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" full_house");
      back_call = player.money;
      player.all_in = true;
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }
    else if(hands.flush[0] ==true){
      player.user_hand = "flush";
      hands.flush.shift();
      player.cardsStrengthArray = hands.flush;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" flush");
      back_call = player.money;
      player.all_in = true;
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }
    else if(hands.straight[0] ==true){
      player.user_hand = "straight";
      hands.straight.shift();
      player.cardsStrengthArray = hands.straight;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" STRAIGHT");
      if(current_call<player.money*0.4){
        back_call = current_call * 2;
      }
      else{
        if(current_call>=player.money){
          back_call = player.money;
          player.all_in = true;
        }
        else{
          back_call = current_call;
        }
      }
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }

    else if(hands.three_of_a_kind[0] ==true){
      player.user_hand = "three_of_a_kind";
      hands.three_of_a_kind.shift();
      player.cardsStrengthArray = hands.three_of_a_kind;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" three_of_a_kind");
      if(current_call<player.money*0.3){
        back_call = Math.round(current_call*2);
      }
      else{
        if(current_call>=player.money){
          back_call = player.money;
          player.all_in = true;
        }
        else{
          back_call = current_call;
        }
      }
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }

    else if(hands.two_pairs[0] ==true){
      player.user_hand = "two_pairs";
      hands.two_pairs.shift();
      player.cardsStrengthArray = hands.two_pairs;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" two_pairs");
      if(current_call<player.money*0.7){
        back_call = Math.round(current_call);
      }
      else{
        if(current_call>=player.money/1.25){
          back_call = current_call;
          player.fold = true;
          return back_call;
        }
        else{
          back_call = current_call;
        }
      }
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }

    else if(hands.one_pair[0] ==true){
      player.user_hand = "one_pair";
      hands.one_pair.shift();
      player.cardsStrengthArray = hands.one_pair;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      current_call = ifPlayerDontWantToCheck(current_call);
      console.log(player_number+" one_pair" );
      if(current_call<player.money*0.7){
        back_call = Math.round(current_call);
      }
      else{
        if(current_call>=player.money/2){
          back_call = current_call;
          player.fold = true;
          return back_call;
        }
        else{
          back_call = current_call;
        }
      }
      Cards.playerMoneyUpdate(player,current_call,player_number,back_call);
      return back_call;
    }
    else{
      player.user_hand = "highest_card";
      hands.highest_card.shift();
      player.cardsStrengthArray = hands.highest_card;
      if(player_number == 0 || player.all_in == true){
        return;
      }
      if(current_call == -1){
        console.log("CHECK");
        return current_call;

      }
      else {
        player.fold = true;
        return current_call;
      }
    }
}

  var Cards = (function(userInt,initialPositions){

    var x,y;
    var time_out_variable = 1;
    var player = function (Card1x,Card1y,Card2x,Card2y,money,fold,user_call,all_in,user_hand,hand_cards,cardsStrengthArray){
      this.Card1x = Card1x;
      this.Card1y = Card1y;
      this.Card2x = Card2x;
      this.Card2y = Card2y;
      this.money = money;
      this.fold = fold;
      this.user_call = user_call;
      this.all_in = all_in;
      this.user_hand = user_hand;
      this.hand_cards = hand_cards;
      this.cardsStrengthArray = cardsStrengthArray;

    };

    var RandomCards = [];
    var flop_river_turn_cards = [];


    function flopRiverTurnDraw(){
      var one,two,three,four,joined,is_repeat;
      for(var i =0; i<5;i++){
        do {
          is_repeat = false;
          one = Math.round((Math.random()*12)+2);
          two = Math.round((Math.random()*3)+1);
          joined = one+"-"+two;
          RandomCards.forEach(function(element){
            if(joined == element){is_repeat=true;}
          })
        } while (is_repeat);
        flop_river_turn_cards.push(joined);
        RandomCards.push(joined);
      }
      for (var i = 0; i< 5; i++) {
        $(".flop-river-turn-relative").append('<img class = "common-card" id="'+flop_river_turn_cards[i]+'" src = "images/cards/'+flop_river_turn_cards[i]+'.png">');
      }

    };



    player.prototype.drawCards = function(){
      var one,two,three,four,joined,is_repeat;
      do {
        is_repeat = false;
        one = Math.round((Math.random()*12)+2);
        two = Math.round((Math.random()*3)+1);
        joined = one+"-"+two;
        RandomCards.forEach(function(element){
          if(joined == element){is_repeat=true;}
        })
      } while (is_repeat);
      RandomCards.push(joined);

      this.Card1x = one;
      this.Card1y = two;
      do {
        is_repeat = false;
        three = Math.round((Math.random()*12)+2);
        four = Math.round((Math.random()*3)+1);
        joined = three+"-"+four;
        RandomCards.forEach(function(element){
          if(joined == element){is_repeat=true;}
        })
      } while (is_repeat);
      RandomCards.push(joined);
      this.Card2x = three;
      this.Card2y = four;
    };

    function playerChoice(element,current_call,player_id){
      var back_call;
      if((element.Card1x == element.Card2x)&&(element.Card1x > 7)){
        back_call = element.money;
        element.all_in = true;
        Cards.playerMoneyUpdate(element,current_call,player_id,back_call);
        return back_call;
      }
      if(element.Card1x >9 && element.Card2x > 9 && current_call < 0.2*element.money){
        back_call = 2*(current_call);
        Cards.playerMoneyUpdate(element,current_call,player_id,back_call);
        return back_call;
      }
      if((element.Card1x > 2 || element.Card2x > 2) && current_call < 0.5*element.money){
        back_call = current_call;
        Cards.playerMoneyUpdate(element,current_call,player_id,back_call);
        return back_call;
      }
      element.fold = true;
      return current_call;
    }

    function howManyCoins(back_call,id){
     var tenK,fiveK,oneK,fiveH,oneH,fifteen,twenty,ten,five,modulo;
     var coinsArray = [];
     tenK = Math.floor(back_call/10000);
     modulo = back_call%10000;
     fiveK = Math.floor(modulo/5000);
     modulo = modulo%5000;
     oneK = Math.floor(modulo/1000);
     modulo = modulo%1000;
     fiveH = Math.floor(modulo/500);
     modulo = modulo%500;
     oneH = Math.floor(modulo/100);
     modulo = modulo%100;
     fifteen = Math.floor(modulo/50);
     modulo = modulo%50;
     twenty = Math.floor(modulo/20);
     modulo = modulo%20;
     ten = Math.floor(modulo/10);
     modulo = modulo%10;
     five = Math.floor(modulo/5);
     modulo = modulo%5;
     coinsArray = [tenK,fiveK,oneK,fiveH,oneH,fifteen,twenty,ten,five]


     addCoins(coinsArray,id);
   }
    function addCoins(coinsArray,id = "pot"){
      var coin_value;
      var child_number = id+1;
      var pot_interval = 0;
      coinsArray.forEach(function(element,index){
        switch(index){
          case 0:
            coin_value = 10000
            break;
          case 1:
            coin_value = 5000
            break;
          case 2:
            coin_value = 1000
            break;
          case 3:
            coin_value = 500
            break;
          case 4:
            coin_value = 100
            break;
          case 5:
            coin_value = 50
            break;
          case 6:
            coin_value = 20
            break;
          case 7:
            coin_value = 10
            break;
          case 8:
            coin_value = 5
            break;
        }

        if(id=="pot" && element != 0){
          pot_interval++;
          $(".coins-pot-wrapper").prepend('<div class = "coins-pot-relative"></div>');
          $(".coins-pot-relative:first").css({marginLeft:50*pot_interval});
          for(var i = 0;i<element;i++){
            let coins_relative = $(".coins-pot-relative:first");
            coins_relative.append('<img class = "coin" src = "images/coins/'+coin_value+'.png">');
            $(".coins-pot-relative:first .coin").eq(i).css({left:10*i+"px"});
          }
        }
        else{
          for(var i = 0;i<element;i++){
            $("#coin-user-"+child_number).append('<img class = "coin" src = "images/coins/'+coin_value+'.png">');
          }
          randomCoins(child_number);
        }
      })
    }
    function randomCoins(child_number){
      $("#coin-user-"+child_number+" .coin").each(function(){
        var x = Math.round(Math.random()*80);
        var y = Math.round(Math.random()*80);
        $(this).css({left:x+"px",top:y+"px"});
      })
      }


    function anyPlayersLeft(){
      var players_left = 0;
      players.forEach(function(element){
        if(element.fold != true){
          players_left++;
        }
      });
      if(players_left > 1){
        return true;
      }
      else{
        return false;
      }
    };

    function playersLeftAfterAllIn(){
      var players_left = 0;
      players.forEach(function(element){
        if(element.fold == false && element.all_in == false){
          players_left++;
        }
      });
      if(players_left > 1){
        return true;
      }
      else{
        return false;
      }
    };
    function cleanOutUserCall(){
      players.forEach(function(element){
        element.user_call = 0;
      })
    };

    return{
       playerMoneyUpdate:function(element,current_call,player_id,back_call){
         let separate_call = back_call - element.user_call;
         pot += separate_call;
         element.money -= separate_call;
         console.log(player_id+" "+back_call);
         userInt.updatePlayerMoney(player_id);
         howManyCoins(separate_call,player_id);
         element.user_call =back_call;
       },

      mainPlayerChoice: function(){
        let separate_call;
        if(players[0].fold == true){
          return;
        }
        else{
          if(players[0].all_in == true){
             separate_call = players[0].money;
          }
          else{
             separate_call = back_call - players[0].user_call;
          }
          pot += separate_call;
          players[0].money -= separate_call;
          console.log("Player 0: "+back_call);
          userInt.updatePlayerMoney(0);
          howManyCoins(separate_call,0);
          players[0].user_call = back_call;
          return;
        }
      },

      createPlayers: function(){
        for(var i = 0; i <number_of_players_in_game; i++){
          var Player = new player();
          players.push(Player);
        }
      },
      drawCard: function(){
        players.forEach(function(elem){
          elem.drawCards();
          elem.fold = false;
          elem.user_call = 0;
          elem.all_in = false;
        })
      },

      flopRiverTurn: function(){
        flopRiverTurnDraw();
      },
      setMoneyToPlayers: function(){
        players.forEach(function(element){
          element.money = 1000;
        })
      },
      players: function(){
        return players;
      },
      handSolver: function(){
        var handsArray = new Array(number_of_players_in_game);
        var winner;
        var length_of_kickers;
        handsArray.fill(0);

        for (let i = 0; i < players.length; i++) {
          if(players[i].fold != true){
            handsArray[i] = players[i].user_hand;
          }
        }
        var handsValues  = new Map()
          .set("highest_card",1)
          .set("one_pair",2)
          .set("two_pairs",3)
          .set("three_of_a_kind",4)
          .set("straight",5)
          .set("flush",6)
          .set("full_house",7)
          .set("four_of_a_kind",8)
          .set("straigth_flush",9)
          .set("royal_flush",10);
        for (let i = 0; i < handsArray.length; i++) {
          if(handsArray[i] == 0){
            continue;
          }
          handsArray[i] = handsValues.get(handsArray[i]);
        };
        var highest_hand = Math.max.apply(Math,handsArray);
        var users_with_equal_hands = [];
        var new_users_with_equal_hands = [];
        for(let z =0;z <handsArray.length;z++){
          if(highest_hand == handsArray[z]){
            users_with_equal_hands.push(z);
        }
      };

        if(users_with_equal_hands.length>1){
          switch(highest_hand){
            case 1:
              length_of_kickers = 5;
              break;
            case 2:
              length_of_kickers = 4;
              break;
            case 3:
            case 4:
              length_of_kickers = 3;
              break;
            case 5:
            case 9:
              length_of_kickers = 1;
              break;
            case 6:
            case 7:
            case 8:
              length_of_kickers = 2;
              break;

          }
              for(var j = 0;j<length_of_kickers;j++){
                var max = players[users_with_equal_hands[0]].cardsStrengthArray[j];
                new_users_with_equal_hands.push(users_with_equal_hands[0]);
                for (var i = 1; i < users_with_equal_hands.length; i++) {
                  if(players[users_with_equal_hands[i]].cardsStrengthArray[j] > max){
                    max = players[users_with_equal_hands[i]].cardsStrengthArray[j];
                    new_users_with_equal_hands = [];
                    new_users_with_equal_hands.push(users_with_equal_hands[i]);
                  }
                  else if(players[users_with_equal_hands[i]].cardsStrengthArray[j] == max){
                    new_users_with_equal_hands.push(users_with_equal_hands[i]);
                  }
                }
                users_with_equal_hands = new_users_with_equal_hands;
                if(users_with_equal_hands.length > 1){
                  new_users_with_equal_hands = [];
                }
                else{
                  break;
                }
              }
          }
          if(users_with_equal_hands.length > 1){
            console.log("Remisują gracze: ");
            users_with_equal_hands.forEach((element)=>{console.log(element);})
          }
          else{
            winner = users_with_equal_hands[0];
            console.log("winner: "+winner);
          }
          userInt.displayWinningCards(users_with_equal_hands);

      },
      identifyHandsForAllIn:function(iteration){
        for (var i = 0; i < players.length; i++) {
          if(players[i].all_in == true){
            IdentifyPokerHands(flop_river_turn_cards,i,iteration,current_call);
          }
        }
      },
      queue: function(){

          (function TheLoop(){
            if(back_call == current_call){
              if(counter == raise_index){
                if(number_of_players_in_game ==2 && pre_flop == "start"){
                  pre_flop = "end";
                  $("#money-slider").attr("min",current_call+5);
                  userInt.toggleButtons(players);
                  i++;
                  counter++;
                  return;
                }
                else{
                  if(iteration < 3){
                    cleanOutUserCall();
                    if(anyPlayersLeft()){
                      current_call = -1;
                    }
                    else{
                      setTimeout(function(){
                          userInt.clearPotCoins();
                          initialPositions.resetCoinsAnimation();
                          howManyCoins(pot);
                          userInt.updatePotValue();
                          $(".player-decision").css("display","none");
                      },500);
                      userInt.animateCoins();
                      return;
                    }
                    if(playersLeftAfterAllIn()){
                      back_call = 0;
                    }
                    else{
                      back_call = -1;
                    }
                    iteration++;
                    raise_index = 1;
                    counter = 1;
                    i=1;
                    userInt.animateCoins();
                    setTimeout(function(){
                        userInt.clearPotCoins();
                        initialPositions.resetCoinsAnimation();
                        howManyCoins(pot);
                        userInt.updatePotValue();
                        $(".player-decision").css("display","none");
                    },500);
                    setTimeout(function(){
                      console.log("!!!!!!!!!!!!!!!!!!!!!");
                      userInt.flop(flop_river_turn_cards,iteration);
                      Cards.identifyHandsForAllIn(iteration);
                      IdentifyPokerHands(flop_river_turn_cards,0,iteration,0);
                      userInt.updateMoneySliderMaxValue();
                      TheLoop();
                    },2000);
                    return;
                  }
                  else{
                    setTimeout(function(){
                        userInt.clearPotCoins();
                        initialPositions.resetCoinsAnimation();
                        howManyCoins(pot);
                        userInt.updatePotValue();
                        $(".player-decision").css("display","none");
                    },500);
                    userInt.animateCoins();
                    Cards.handSolver();
                    return;
                  }
                }
              };
            };


            if(players[i].fold == true || players[i].all_in == true)  {
                counter +=1;
                i += 1;
                if(i< players.length){
                  TheLoop();
                }
                else{
                  i = 0;
                  counter = 0;
                  if(players[0].fold != true && players[0].all_in != true){
                    if(raise_index == counter){
                      TheLoop();
                    }
                    else{
                      $("#money-slider").attr("min",current_call+5);
                      userInt.toggleButtons(players);
                    }
                  }
                  else{
                    i = 1;
                    counter = 1;
                    TheLoop();
                  }

                }
              }
            else {
              setTimeout(function(){

                if(i>0){
                  if(iteration>0){
                    back_call = IdentifyPokerHands(flop_river_turn_cards,i,iteration,current_call);
                  }
                  else{
                    back_call = playerChoice(players[i],current_call,i,back_call);
                  }
                  userInt.showPlayerDecision(current_call,back_call,i);
                };


                if(back_call>current_call){
                  current_call = back_call;
                  raise_index = counter;
                }
                else if(back_call == -1){
                  current_call = back_call;
                }
              counter +=1;
              i += 1;
              if(i < players.length)
              {
                TheLoop();
              }
              else{
                i = 0;
                counter = 0;
                if(i == raise_index){
                  TheLoop();
                }
                else{
                  if(players[0].fold != true && players[0].all_in != true ){
                    $("#money-slider").attr("min",current_call+5);
                    userInt.toggleButtons(players);
                  }
                  else{
                    i = 1;
                    counter = 1;
                    TheLoop();
                  }
                }
              }
            },700);
          };
          })();
        }
    }
  })(UserInterface,InitPositions);




  var Controller  = (function(InitPos,Cards,UserInter){

    $(".button").toggle();
    $("#check").on("click",function(){
      back_call = -1;
    });

    $("#fold").on("click",function(){
      players[0].fold = true;
    });

    $("#call").on("click",function(){
      back_call = current_call;
    });

    $("#raise").on("click",function(){
      back_call = Number($("#money-slider").val());
    });

    $("#all_in").on("click",function(){
      players[0].all_in = true;
    });

    $(".button").on("click",function(){
      UserInter.toggleButtons(players);
      Cards.mainPlayerChoice();
      UserInter.showPlayerDecision(current_call,back_call,0);
      Cards.queue();
    });

    $("#money-slider").on("input",function(){
      UserInter.updateRiseValue();
    });

    return{
      init:function(){
        Cards.createPlayers();
        Cards.drawCard();
        Cards.flopRiverTurn();
        Cards.setMoneyToPlayers();
        UserInter.displayUsers();
        UserInter.showPlayerCards();
        InitPos.initialPositions();
        UserInter.updateMoneySliderMaxValue();
      }
    }
  })(InitPositions,Cards,UserInterface);

  $(".deal-the-cards").on("click",function(){
    Controller.init();
    $(".start-page").fadeOut(1000);
    setTimeout(function(){
      InitPositions.initCardsPositions();
    },500);
    setTimeout(function(){
      Cards.queue();
    },3500);
  });

});
