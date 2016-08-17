/*jshint browser: true*/


var TURNS = (function() {
  var TURN_STATES = {
    RECHARGE: 1,
    MOVEMENT: 2,
    ACTION: 3
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
    LOG.ge(output);
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
        case TURN_STATES.RECHARGE:
          LOG.ge('Recharge phase ended, movement phase starts.');
          activeState = TURN_STATES.MOVEMENT;
          break;
        case TURN_STATES.MOVEMENT:
          LOG.ge('Movement phase ended, action phase starts.');
          activeState = TURN_STATES.ACTION;
          break;
        case TURN_STATES.ACTION:
          LOG.ge('Action phase ended, next turn.');
          activePlayer = activePlayer * -1;
          activeState = TURN_STATES.RECHARGE;
          playersTurn();
          LOG.ge((activePlayer > 0 ? 'Green' : 'Red') + ' player\'s turn.');
          // this can be moved from here in the future probably...
          setTimeout(_.bind(function() {
            UTILS.rechargeAll();
            TURNS.endState();
          }, this), 300);
          break;
      }

      window.STATE = activeState;
    },
    getPlayer: function() {
      return activePlayer;
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
    }
  };
})();
