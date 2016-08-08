/*jshint browser: true*/

GAME.utils = {
  shake: function() {
    $('body').one('animationend', function(){
      $('body').removeClass('shake');
    });

    $('body').addClass('shake');
  },

  moveRow: function(killedEntity) {
    var orientation = killedEntity.orientation;
    var emptyPosition = killedEntity.position;
    var set = orientation < 0 ? enemies : units;
    // I kind of feel this is not what I wanted to achieve...
    // those should be removed from the original sets (enemies/units);
    set = _.without(set, killedEntity);

    _.each(set, function(unit) {
      if (unit.position.y === emptyPosition.y) {
        unit.moveTo(
          parseInt(unit.position.x, 10) - orientation, unit.position.y);
      }
    });
  },

  getUnitsHorizontaly: function(hero) {
    var position = hero.position;
    var range = hero.attackRange + 1;
    var orientation = hero.orientation;
    var set = orientation > 0 ? GAME.units.reds : GAME.units.greens;
    range = range || 100;
    return _.filter(set, function(unit) {
      return unit.alive && unit.position.y === position.y && Math.abs(unit.position.x-position.x) < range;
    }).sort(function(){ return orientation; });
  },

  // getUnitsHorizontaly: function(hero) {
  //   var position = hero.position;
  //   var range = hero.attackRange + 1;
  //   var orientation = hero.orientation;
  //   var set = orientation > 0 ? GAME.units.reds : GAME.units.greens;
  //   range = range || 100;
  //   return _.filter(set, function(unit) {
  //     return unit.alive && unit.position.y === position.y && Math.abs(unit.position.x-position.x) < range;
  //   }).sort(function(){ return orientation; });
  // }
};
