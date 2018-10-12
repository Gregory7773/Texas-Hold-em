'use strict';

$(document).ready(function(){

  var i = 3;
  var current_call = 65;
  var back_call;
  var raise_index = 3;
  var counter = 3;
  var iteration = 0;
  var Players = [];
  var pot = 0;


  var initPositions = (function(){

    function initPosCards(n){
      if(n === 3){
      $(".card").eq(0).addClass("deal-player-card-1");
      $(".card").eq(1).addClass("deal-card-3-1-1");
      $(".card").eq(2).addClass("deal-card-3-2-1");
      $(".card").eq(3).addClass("deal-player-card-2");
      $(".card").eq(4).addClass("deal-card-3-1-2");
      $(".card").eq(5).addClass("deal-card-3-2-2");
      }
      else if(n === 6){
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

    function initPosPlayers(n){
      $("#player").css({"bottom":"-2%","left":"50%"});
      $("#user1").css({"bottom":"1%","left":"17%"});
      $("#user2").css({"bottom":"40%","left":"8%"});
      $("#user3").css({"bottom":"89%","left":"18%"});
      $("#user4").css({"bottom":"89%","left":"46%"});
      $("#user5").css({"bottom":"89%","left":"70%"});
      $("#user6").css({"bottom":"40%","left":"94%"});
      $("#user7").css({"bottom":"1%","left":"74%"});
    }

    function initPosCoins(n){
      $("#user-1-coins").css({"top":"165%","left":"68%"});
      $("#user-2-coins").css({"top":"165%","left":"10%"});
      $("#user-3-coins").css({"top":"0%","left":"-31%"});
      $("#user-4-coins").css({"top":"-36%","left":"-8%"});
      $("#user-5-coins").css({"top":"-26%","left":"62%"});
      $("#user-6-coins").css({"top":"-26%","left":"110%"});
      $("#user-7-coins").css({"top":"57%","left":"104%"});
      $("#user-8-coins").css({"top":"132%","left":"130%"});
    }

    return {
      initialPositions: function(n){
        initPosPlayers(n);
        initPosCoins(n);
      },
      resetCoinsAnimation:function(n){
        $(".user-coins").empty();
        initPosCoins(n);

      },
      initCardsPositions: function(n){
        initPosCards(n);
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
      showPlayerCards: function(players,n){
        var insertCardHTML = '<img class = "card" src = "images/cards/'+players[0].Card1x+'-'+players[0].Card1y+'.png">'
        $("#player").before(insertCardHTML);

        for(var i = 0 ; i< (n-2);i++){
          $("#player").before('<img class = "card" src = "images/cards/card back.png">')
        }
        insertCardHTML = '<img class = "card" src = "images/cards/'+players[0].Card2x+'-'+players[0].Card2y+'.png">'
        $("#player").before(insertCardHTML);

        for(var i = 0 ; i< (n-2);i++){
          $("#player").before('<img class = "card" src = "images/cards/card back.png">')
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
          $(".flop-river-turn").append('<img class = "common-card" src = "images/cards/'+cards[0]+'.png">');
          $(".flop-river-turn").append('<img class = "common-card" src = "images/cards/'+cards[1]+'.png">');
          $(".flop-river-turn").append('<img class = "common-card" src = "images/cards/'+cards[2]+'.png">');
        }
        else if(iteration == 2){
          $(".flop-river-turn").append('<img class = "common-card" src = "images/cards/'+cards[3]+'.png">')
        }
        else{
          $(".flop-river-turn").append('<img class = "common-card" src = "images/cards/'+cards[4]+'.png">')
        }
      },
      showPlayerDecision: function(current_call,back_call,player_num = 0){
        $(".player-decision").eq(player_num).remove();
        $(".inner-user-container").eq(player_num).prepend("<div class = 'player-decision'></div>");
        var element = $(".player-decision").eq(player_num);
        if(Players[player_num].all_in == true){
          element.html("ALL IN");
        }
        else if(Players[player_num].fold == true){
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
        $(".coins_wrapper").css({"top":"92%","left":"55%"});
      },
      updatePotValue:function(){
        $(".pot").html("Pot: "+pot);
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
  var IdentifyPokerHands = function(community_cards,player_number,iteration,current_call){
    var numbers = [];
    var colors = [];
    var repeating_numbers = [];
    var n;
    var how_many_pairs = 0;
    var is_straight = 0;
    var is_flush = 0;
    var hands = {
      highest_card:[],
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
    var player = Players[player_number];

    numbers.push(player.Card1x);
    numbers.push(player.Card2x);
    colors.push(player.Card1y);
    colors.push(player.Card2y);

    for(let i = 0;i<13;i++){
      repeating_numbers[i] = 0;
    };
    if(iteration == 1){
      n=3;
    }
    else if(iteration == 2){
      n=4;
    }
    else{
      n=5;
    }
    for(let i = 0;i<n;i++){
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
    for (var i = 0; i < 5; i++) {
      hands.highest_card[i] = numbers[i];
    }
  //remove repeating numbers
  let end_of_array = false;
  do{
    for (var i = 0; i < numbers.length; i++) {
      if(numbers[i] == numbers[i+1]){
        numbers.splice(i+1,1);
        break;
      }
      if(i == numbers.length-1){
        end_of_array = true;
      }
    }
  }
  while(!end_of_array);





  //One pair
  for(let i = 0;i<repeating_numbers.length;i++){
    if(repeating_numbers[i] == 2){
      hands.one_pair[0] = true;
      hands.one_pair[1] = i+2;
    }
  }
  for (let j = 0; j < numbers.length; j++) {
    hands.one_pair[j+2] = numbers[j];
  }
    hands.one_pair.splice(hands.one_pair.indexOf(hands.one_pair[1],2),1);
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
  for (let j = 0; j < numbers.length; j++) {
    hands.two_pairs[j+3] = numbers[j];
  }
  hands.two_pairs.splice(hands.two_pairs.indexOf(hands.two_pairs[1],3),1);
  hands.two_pairs.splice(hands.two_pairs.indexOf(hands.two_pairs[2],3),1);

  //three of a kind
  for(let i = 0;i<repeating_numbers.length;i++){
    if(repeating_numbers[i] == 3){
      hands.three_of_a_kind[0] = true;
      hands.three_of_a_kind[1] = i+2;
    }
  };
  for (let j = 0; j < numbers.length; j++) {
    hands.three_of_a_kind[j+2] = numbers[j];
  }
  hands.three_of_a_kind.splice(hands.three_of_a_kind.indexOf(hands.three_of_a_kind[1],2),1);
  //straight
    for(let i = 0;i<numbers.length;i++){
      if(is_straight == 4){
          hands.straight[0] = true;
          hands.straight[1] = numbers[i-4];
          break;
      }
      else{
        if(numbers[i] == numbers[i+1]+1){
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
        hands.flush[1] = numbers[0];
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
}
//four_of_a_kind
for(let i = 0;i<repeating_numbers.length;i++){
  if(repeating_numbers[i] == 4){
    hands.four_of_a_kind[0] = true;
    hands.four_of_a_kind[1] = i+2;
    hands.four_of_a_kind[2] = numbers[0];
  }
}
//straight flush and royal flush
if(hands.straight[0] == true && hands.flush[0] == true){
  hands.straight_flush[0] = true;
  if(hands.straight[1] == 14){
    hands.royal_flush[0] = true;
  }
}

//how much money bet
let back_call = 0;
  if(hands.royal_flush[0] ==true){
    player.user_hand = "royal_flush";
    if(player_number == 0){
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
    hands.straigth_flush.shift();
    player.cardsStrengthArray = hands.straigth_flush;
    if(player_number == 0){
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
    if(player_number == 0){
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
    if(player_number == 0){
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
    if(player_number == 0){
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
    if(player_number == 0){
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
    if(player_number == 0){
      return;
    }
    current_call = ifPlayerDontWantToCheck(current_call);
    console.log(player_number+" three_of_a_kind");
    if(current_call<player.money*0.3){
      back_call = Math.round(current_call*1.7);
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
    if(player_number == 0){
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
    if(player_number == 0){
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
    player.cardsStrengthArray = hands.highest_card;
    if(player_number == 0){
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
    var player = function (Card1x,Card1y,Card2x,Card2y,money,fold,user_call,all_in,user_hand,cardsStrengthArray){
      this.Card1x = Card1x;
      this.Card1y = Card1y;
      this.Card2x = Card2x;
      this.Card2y = Card2y;
      this.money = money;
      this.fold = fold;
      this.user_call = user_call;
      this.all_in = all_in;
      this.user_hand = user_hand;
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
        back_call = Math.round(element.money/3);
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
      var object;

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
        object = id =="pot" ? ".coins-pot-relative":"#coin-user-"+child_number;
        for(var i = 0;i<element;i++){
          $(object).append('<img class = "coin" src = "images/coins/'+coin_value+'.png">');
        }
      })
      count(object);
    }

    function count(object){

      $(object+" .coin").each(function(){
        var x = Math.round(Math.random()*80);
        var y = Math.round(Math.random()*80);
        $(this).css({left:x+"px",top:y+"px"});
    });
  }

    function anyPlayersLeft(){
      var players_left = 0;
      Players.forEach(function(element){
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
      Players.forEach(function(element){
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
      Players.forEach(function(element){
        element.user_call = 0;
      })
    };

    return{
       playerMoneyUpdate:function(element,current_call,player_id,back_call){
         let separate_call = back_call - element.user_call;
         pot += separate_call;
         element.money -= separate_call;
         console.log(player_id+" "+back_call);
         howManyCoins(separate_call,player_id);
         element.user_call = current_call;
       },

      mainPlayerChoice: function(){
        let separate_call;
        if(Players[0].fold == true){
          return;
        }
        else{
          if(Players[0].all_in == true){
             separate_call = Players[0].money;
          }
          else{
             separate_call = back_call - Players[0].user_call;
          }
          pot += separate_call;
          Players[0].money -= separate_call;
          console.log("Player 0: "+back_call);
          howManyCoins(separate_call,0);
          Players[0].user_call = back_call;
          return;
        }
      },

      createPlayers: function(n){
        for(var i = 0; i < n-1; i++){
          var Player = new player();
          Players.push(Player);
        }
      },
      drawCard: function(){
        Players.forEach(function(elem){
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
        Players.forEach(function(element){
          element.money = 1000;
        })
      },
      players: function(){
        return Players;
      },
      handSolver: function(){
        var handsArray = new Array(8);
        var winner;
        var length_of_kickers;
        handsArray.fill(0);

        for (let i = 0; i < Players.length; i++) {
          if(Players[i].fold != true){
            handsArray[i] = Players[i].user_hand;
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
                var max = Players[users_with_equal_hands[0]].cardsStrengthArray[j];
                new_users_with_equal_hands.push(users_with_equal_hands[0]);
                for (var i = 1; i < users_with_equal_hands.length; i++) {
                  if(Players[users_with_equal_hands[i]].cardsStrengthArray[j] > max){
                    max = Players[users_with_equal_hands[i]].cardsStrengthArray[j];
                    new_users_with_equal_hands = [];
                    new_users_with_equal_hands.push(users_with_equal_hands[i]);
                  }
                  else if(Players[users_with_equal_hands[i]].cardsStrengthArray[j] == max){
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


      },
      queue: function(){

          (function TheLoop(){
            if(back_call == current_call){
              if(counter == raise_index){
                if(iteration < 3){
                  cleanOutUserCall();
                  if(anyPlayersLeft()){
                    current_call = -1;
                  }
                  else{
                    Cards.handSolver();
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
                    console.log("!!!!!!!!!!!!!!!!!!!!!");
                    initialPositions.resetCoinsAnimation(8);
                    howManyCoins(pot);
                    userInt.updatePotValue();
                    userInt.flop(flop_river_turn_cards,iteration);
                    IdentifyPokerHands(flop_river_turn_cards,0,iteration,0);
                    TheLoop();
                  },1000);
                  return;
                }
                else{
                  Cards.handSolver();
                  return;
                }
              };
            };


            if(Players[i].fold == true || Players[i].all_in == true)  {
                counter +=1;
                i += 1;
                if(i< Players.length){
                  TheLoop();
                }
                else{
                  i = 0;
                  counter = 0;
                  if(Players[0].fold != true && Players[0].all_in != true){
                    if(raise_index == counter){
                      TheLoop();
                    }
                    else{
                      $("#money-slider").attr("min",current_call+5);
                      userInt.toggleButtons(Players);
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
                    back_call = playerChoice(Players[i],current_call,i,back_call);
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
              if(i < Players.length)
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
                  if(Players[0].fold != true && Players[0].all_in != true ){
                    $("#money-slider").attr("min",current_call+5);
                    userInt.toggleButtons(Players);
                  }
                  else{
                    i = 1;
                    counter = 1;
                    TheLoop();
                  }
                }
              }
            },1000);
          };
          })();
        }
    }
  })(UserInterface,initPositions);




  var controller  = (function(initPos,Cards,UserInter){

    var n = 9;
    var Players = Cards.players();
    $("#check").on("click",function(){
      back_call = -1;
    });

    $("#fold").on("click",function(){
      Players[0].fold = true;
    });

    $("#call").on("click",function(){
      back_call = current_call;
    });

    $("#raise").on("click",function(){
      back_call = Number($("#money-slider").val());
    });

    $("#all_in").on("click",function(){
      Players[0].all_in = true;
    });

    $(".button").on("click",function(){
      UserInter.toggleButtons(Players);
      Cards.mainPlayerChoice();
      UserInter.showPlayerDecision(current_call,back_call,0);
      Cards.queue();
    });

    $(".deal-the-cards").on("click",function(){
      $(".start-page").fadeOut(1000);
      initPos.initCardsPositions(n);
      setTimeout(function(){Cards.queue();},2500);
    });
    Cards.createPlayers(n);
    Cards.drawCard();
    Cards.flopRiverTurn();
    Cards.setMoneyToPlayers();
    UserInter.showPlayerCards(Players,n);
    initPos.initialPositions(n);
    $(".button").toggle();
    $('.player-decision').toggle();

  })(initPositions,Cards,UserInterface);
});
