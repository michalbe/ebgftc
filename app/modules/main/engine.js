/*jshint browser: true*/


GAME.engine = (function() {
  var TURN_STATES = {
    MOVEMENT: 1,
    ACTION: 2,
    RECHARGE: 3
  };

  var activePlayer = 1;
  var activeState = TURN_STATES.MOVEMENT;

  return {
    endTurn: function() {
      activePlayer = activePlayer * -1;
    },
    getActiveState: function () {
      return activeState;
    }
  };
})();
