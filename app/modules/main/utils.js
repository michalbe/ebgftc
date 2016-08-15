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
    var set = orientation < 0 ? GAME.units.reds : GAME.units.greens;
    // I kind of feel this is not what I wanted to achieve...
    // those should be removed from the original sets (enemies/units);
    // set = _.without(set, killedEntity);

    _.each(set, function(unit) {
      if (
        unit.position.y === emptyPosition.y &&
        (
          (orientation < 0 && unit.position.x < emptyPosition.x) ||
          (orientation > 0 && unit.position.x > emptyPosition.x)
        )
      ) {
        unit.moveTo(
          parseInt(unit.position.x, 10) - orientation, unit.position.y);
      }
    });
  },

  getUnitsHorizontalyInRange: function(hero) {
    var position = hero.position;
    var range = hero.attackRange + 1;
    var orientation = hero.orientation;
    var set = orientation > 0 ? GAME.units.reds : GAME.units.greens;
    range = range || 100;
    return _.filter(set, function(unit) {
      return unit.alive && unit.position.y === position.y && Math.abs(unit.position.x-position.x) < range;
    }).sort(function(a, b) { return orientation < 0 ? (a.position.x - b.position.x) : (b.position.x - a.position.x); });
  },

  getUnitsHorizontaly: function(row) {
    return _.filter(GAME.units.reds.concat(GAME.units.greens), function(unit) {
      return unit.alive && unit.position.y === parseInt(row, 10);
    });
  },

  getUnitsVertically: function(column) {
    return _.filter(GAME.units.reds.concat(GAME.units.greens), function(unit) {
      return unit.alive && unit.position.x === parseInt(column, 10);
    });
  },

  swipeColumn: function(column, direction) {
    var units = this.getUnitsVertically(column);
    units = units.sort(function(a, b) {
      return a.position.y - b.position.y;
    });

    var method = 'pop';
    if (direction < 0) {
      method = 'shift';
    }

    var teleportY = direction > 0 ? -1 : GAME.board.rows;
    var moveToY = direction > 0 ? 0 : GAME.board.rows - 1;
    var unitToTeleport = units[method]();

    if (
      !(direction > 0 && unitToTeleport.position.y !== GAME.board.rows - 1 ||
      direction < 0 && unitToTeleport.position.y !== 0)
    ) {
      // no teleport, empty spot at the end
      unitToTeleport.teleportTo(unitToTeleport.position.x, teleportY);
      unitToTeleport.moveTo(unitToTeleport.position.x, moveToY);
    } else {
      method = 'push';
      if (direction < 0) {
        method = 'unshift';
      }

      units[method](unitToTeleport);
    }
    _.each(units, function(unit) {
      unit.moveTo(unit.position.x, parseInt(unit.position.y, 10) + direction);
    });
    this.fillEmptySpots();
  },

  getUnitByCell: function(x, y) {
    return _.find(GAME.units.reds.concat(GAME.units.greens), function(unit) {
      return unit.alive && unit.position.x === x && unit.position.y === y;
    });
  },

  fillEmptySpots: function() {
    var unit;
    for (var x=0; x<GAME.board.cols; x++) {
      if (x !== ~~(GAME.board.cols/2)) {
        for (var y=0; y<GAME.board.rows; y++) {
          unit = this.getUnitByCell(x, y);
          if (!unit) {
            console.log('hej', unit);
            this.moveRow({
              orientation: x < ~~(GAME.board.cols/2) ? -1 : 1,
              position: {x:x, y:y}
            });
          }
        }
      }
    }
    // var self = this;
    // var set = GAME.units.greens
    //   .sort(function(a, b) {
    //     return b.position.x - a.position.x;
    //   })
    //   .sort(function(a, b) {
    //     return b.position.y - a.position.y;
    //   });
    // console.log(set[0]);
    // // _.each(set, function(unit) {
    // var unit = set[0];
    //   var isNextFieldEmpty = self.getUnitByCell(unit.position.x - unit.orientation, unit.position.y);
    //   if (isNextFieldEmpty && unit.position.x - unit.orientation !== ~~(GAME.board.cols/2)) {
    //     unit.moveTo(unit.position.x - unit.orientation, unit.position.y);
    //   }
    // // });
    // // for (var i=0; i < ; i++)
  }
};
