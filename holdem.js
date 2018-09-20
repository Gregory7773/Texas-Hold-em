$(document).ready(function(){

  var i = 3;
  var current_call = 65;
  var back_call;
  var raise_index = 3;
  var counter = 3;
  var iteration = 0;
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
      $("#player").css({"bottom":"-10%","left":"50%"});
      $("#user1").css({"bottom":"-10%","left":"17%"});
      $("#user2").css({"bottom":"40%","left":"-1%"});
      $("#user3").css({"bottom":"87%","left":"27%"});
      $("#user4").css({"bottom":"87%","left":"46%"});
      $("#user5").css({"bottom":"87%","left":"65%"});
      $("#user6").css({"bottom":"40%","left":"94%"});
      $("#user7").css({"bottom":"-10%","left":"74%"});
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
      }

    }
  })();


  var Cards = (function(userInt){

    var x,y;
    var time_out_variable = 1;
    var player = function (Card1x,Card1y,Card2x,Card2y,money,fold,user_call,all_in){
      this.Card1x = Card1x;
      this.Card1y = Card1y;
      this.Card2x = Card2x;
      this.Card2y = Card2y;
      this.money = money;
      this.fold = fold;
      this.user_call = user_call;
      this.all_in = all_in;
    };

    var Players = [];
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

    function playerChoice(element,current_call,id,check){
      var back_call,separate_call;
      if((element.Card1x == element.Card2x)&&(element.Card1x > 7)){
        back_call = element.money;
        separate_call = back_call - element.user_call;
        element.money -= separate_call;
        console.log(Players.indexOf(element)+" "+back_call);
        howManyCoins(separate_call,id);
        element.user_call = current_call;
        element.all_in = true;
        return back_call;
      }
      if(element.Card1x >9 && element.Card2x > 9 && current_call < 0.2*element.money){
        back_call = 2*(current_call);
        separate_call = back_call - element.user_call;
        element.money -= separate_call;
        console.log(Players.indexOf(element)+" "+back_call);
        howManyCoins(separate_call,id);
        element.user_call = current_call;
        return back_call;
      }
      if((element.Card1x > 9 || element.Card2x > 9) && current_call < 0.5*element.money){
        back_call = current_call;
        separate_call = back_call - element.user_call;
        element.money -= separate_call;
        console.log(Players.indexOf(element)+" "+back_call);
        console.log(Players);
        howManyCoins(separate_call,id);
        element.user_call = current_call;
        return back_call;
      }
      element.fold = true;
      return current_call;
    }


    function addCoins(coinsArray,id){
      var coin_value;
      var child_number = id+1;

      coinsArray.forEach(function(element,index){
        switch(index){
          case 0:
            coin_value = 10000;
            break;
          case 1:
            coin_value = 5000;
            break;
          case 2:
            coin_value = 1000;
            break;
          case 3:
            coin_value = 500;
            break;
          case 4:
            coin_value = 100;
            break;
          case 5:
            coin_value = 50;
            break;
          case 6:
            coin_value = 20;
            break;
          case 7:
            coin_value = 10
            break;
          case 8:
            coin_value = 5
            break;
        }
        for(var i = 0;i<element;i++){
          var x = count();
          var y = count();
          $("#coin-user-"+child_number).append('<img class = "coin" src = "images/coins/'+coin_value+'.png">');
          $("#coin-user-"+child_number+" .coin:last-child").css({left:x+"px",top:y+"px"});
        }
      })
    }

    function count(){
      return Math.round(Math.random()*80);
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
      mainPlayerChoice: function(){
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
          Players[0].money -= separate_call;
          console.log("Player 0: "+separate_call);
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
      queue: function(){


          (function TheLoop(){
            if(back_call == current_call){
              if(counter == raise_index){
                if(iteration < 3){
                  cleanOutUserCall();
                  if(anyPlayersLeft()){
                    current_call = 65;
                  }
                  else{
                    return;
                  }
                  if(playersLeftAfterAllIn()){
                    back_call = 0;
                  }
                  else{
                    back_call = 65;
                  }
                  iteration++;
                  raise_index = 1;
                  counter = 1;
                  i=1;
                  console.log("gówno1");
                  setTimeout(function(){
                    userInt.flop(flop_river_turn_cards,iteration);
                    console.log("gówno2");
                    TheLoop();
                  },1000);
                  return;
                }
                else{
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
                  if(Players[0].fold != true){
                    userInt.toggleButtons(Players);
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
                  back_call = playerChoice(Players[i],current_call,i,back_call);
                };

                if(back_call>current_call){
                  current_call = back_call;
                  raise_index = counter;
                };
              counter +=1;
              i += 1;
              if(i < Players.length)
              {
                TheLoop();
              }
              else{
                i = 0;
                counter = 0;
                if(Players[0].fold != true){
                  userInt.toggleButtons(Players);
                }
                else{
                  i = 1;
                  counter = 1;
                  TheLoop();
                }
              }
            },100);
            }
          })();
        }
    }
  })(UserInterface);




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
      back_call = $(".money-slider").attr("value");
    });

    $("#all_in").on("click",function(){
      Players[0].all_in = true;
    });

    $(".button").on("click",function(){
      UserInter.toggleButtons(Players);
      Cards.mainPlayerChoice();
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


  })(initPositions,Cards,UserInterface);
});
