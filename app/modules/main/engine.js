/*jshint browser: true*/


GAME.engine = (function() {
  var TURN_STATES = {
    MOVEMENT: 1,
    ACTION: 2,
    RECHARGE: 3
  };

  var activePlayer = 1;
  var activeState = TURN_STATES.MOVEMENT;

  var defaultActions = {
    moves: 3,
    actions: 3
  };

  // OMG this is awful...
  var players = {
    '1' : {},
    '-1': {}
  };

  var playersTurn = function() {
    var output = (activePlayer > 0 ? 'Green' : 'Red') + ' player has now ';
    for (var i in defaultActions) {
      output += defaultActions[i] + ' ' + i + ', ';
      players[activePlayer][i] = defaultActions[i];
    }

    document.body.classList = (activePlayer > 0 ? 'green' : 'red') + '-turn';
    GAME.log.ge(output);
  };

  return {
    start: function() {
      playersTurn();
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
      switch(activeState) {
        case TURN_STATES.MOVEMENT:
          GAME.log.ge('Movement phase ended, action phase starts.');
          activeState = TURN_STATES.ACTION;
          break;
        case TURN_STATES.ACTION:
          GAME.log.ge('Action phase ended, Recharge phase starts.');
          activeState = TURN_STATES.RECHARGE;
          break;
        case TURN_STATES.RECHARGE:
          GAME.log.ge('Recharge phase ended.');
          activePlayer = activePlayer * -1;
          activeState = TURN_STATES.MOVEMENT;
          playersTurn();
          GAME.log.ge((activePlayer > 0 ? 'Green' : 'Red') + ' players turn.');
          break;
      }
    },
    getPlayer: function() {
      return activePlayer;
    },

    makeMove: function() {
      players[activePlayer].moves--;
      GAME.log.ge((activePlayer > 0 ? 'Green' : 'Red') + ' moved. ' + players[activePlayer].moves + ' left');
      if (players[activePlayer].moves === 0) {
        this.endState();
      }
    },

    makeAction: function() {
      if (this.isMovementState()) {
        this.endState();
      }
      players[activePlayer].actions--;
      GAME.log.ge((activePlayer > 0 ? 'Green' : 'Red') + ' performed action. ' + players[activePlayer].actions + ' left');
      if (players[activePlayer].actions === 0) {
        this.endState();
      }
    }
  };
})();
