/*jshint browser: true*/


var TURNS = (function() {
  var TURN_STATES = {
    RECHARGE: 1,
    MOVEMENT: 2,
    ACTION: 3,
    BUY: 4
  };

  // var isFirstTurn = true;
  var activePlayer = 1;
  var activeState = TURN_STATES.MOVEMENT;

  var defaultActions = {
    moves: Infinity,
    actions: 1
  };

  var bonusActions = {
    '-1': {
      moves: 0,
      actions: 0
    },
    1: {
      moves: 0,
      actions: 0
    }
  };


  // OMG this is awful...
  var players = {
    '1' : { money: 1 },
    '-1': { money: 2 }
  };

  var turn = 1;

  var playersTurn = function() {
    var output = (activePlayer > 0 ? 'Green' : 'Red') + ' player has now ';
    for (var i in defaultActions) {
      output += defaultActions[i] + ' ' + i + ', ';
      players[activePlayer][i] = defaultActions[i];
    }

    output += 'and ' + players[activePlayer].money + ' money to spend';

    document.body.classList = (activePlayer > 0 ? 'green' : 'red') + '-turn';
    LOG.ge(output);
  };

  return {
    start: function() {
      BUYSCREEN.drawHeroes();
      playersTurn();
    },
    getTurn: function() {
      return turn;
    },
    isMovementState: function() {
      return activeState === TURN_STATES.MOVEMENT;
    },
    isActionState: function() {
      return activeState === TURN_STATES.ACTION;
    },
    isRechargeState: function() {
      return activeState === TURN_STATES.RECHARGE;
    },
    endState: function() {
      console.log('END STATE', activeState);
      switch(activeState) {
        case TURN_STATES.RECHARGE:
          if (activePlayer > 0) {
            BUYSCREEN.drawHeroes();
            turn++;
          }
          // this can be moved from here in the future probably...
          UTILS.rechargeAll();
          TURNS.earn(turn);
          LOG.ge('Recharge phase ended, movement phase starts.');
          activeState = TURN_STATES.MOVEMENT;
          break;
        case TURN_STATES.MOVEMENT:
          LOG.ge('Movement phase ended, action phase starts.');
          activeState = TURN_STATES.ACTION;
          break;
        case TURN_STATES.ACTION:
          LOG.ge('Action phase ended, buy phase.');
          activeState = TURN_STATES.BUY;
          BUYSCREEN.show();
          break;
        case TURN_STATES.BUY:
          LOG.ge('Buy phase ended, next turn.');
          activePlayer = activePlayer * -1;
          playersTurn();
          LOG.ge((activePlayer > 0 ? 'Green' : 'Red') + ' player\'s turn.');
          activeState = TURN_STATES.RECHARGE;
          TURNS.endState();
          break;
      }

      window.STATE = activeState;
    },
    getPlayer: function() {
      return activePlayer;
    },
    // THIS CAN BE OPTIMIZED WITH THE ABOVE TO RETURN FULL PLAYER OBJECT
    getPlayersMoney: function() {
      return players[activePlayer].money;
    },
    pay: function(amount) {
      players[activePlayer].money = players[activePlayer].money - amount;
    },
    earn: function(amount) {
      players[activePlayer].money = players[activePlayer].money + amount;
    },
    makeMove: function() {
      players[activePlayer].moves--;
      LOG.ge((activePlayer > 0 ? 'Green' : 'Red') + ' moved. ' + players[activePlayer].moves + ' left');
      if (players[activePlayer].moves === 0) {
        this.endState();
      }
    },

    makeAction: function() {
      if (this.isMovementState()) {
        this.endState();
      }
      players[activePlayer].actions--;
      LOG.ge((activePlayer > 0 ? 'Green' : 'Red') + ' performed action. ' + players[activePlayer].actions + ' left');
      if (players[activePlayer].actions === 0) {
        this.endState();
      }
    },
    addAction: function(count) {
      players[activePlayer].actions += count;
    },

    addHero: function(heroClass) {
      var set = activePlayer > 0 ? 'greens' : 'reds';
      var hero = new HEROES[heroClass]();
      hero.init();
      hero.orientation = activePlayer;
      LOG.ge('Choose where to place your ' + hero.name);
      GAME.units[set].push(hero);
      GAME.heroToAdd = hero;
      document.body.classList.add('placing_hero');
    }
  };
})();
