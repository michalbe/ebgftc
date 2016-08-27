/*jshint browser: true*/

var UTILS = {
  shake: function() {
    $('body').one('animationend', function(){
      $('body').removeClass('shake');
    });

    $('body').addClass('shake');
  },

  rechargeAll: function() {
    var recharged = 0;
    var set = TURNS.getPlayer() < 0 ? GAME.units.reds : GAME.units.greens;

    console.log('RECZARDŻ', TURNS.getPlayer());
    set.forEach(function(unit) {
      if (unit.rechargeStop()) {
        recharged++;
      }
    });

    LOG.ge(recharged + ' units recharged');
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

    var teleportY = direction > 0 ? -1 : BOARD.rows;
    var moveToY = direction > 0 ? 0 : BOARD.rows - 1;
    var unitToTeleport = units[method]();

    if (
      !(direction > 0 && unitToTeleport.position.y !== BOARD.rows - 1 ||
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

  fillHalfBoard: function(orientation) {
    var unit;
    var start = orientation > 0 ? BOARD.cols-1 : 0;
    var end = Math.floor(BOARD.cols/2);
    var inc = orientation * -1;

    for (var x = start; orientation > 0 ? x > end : x < end; x += inc) {
      for (var y=0; y<BOARD.rows; y++) {
        unit = this.getUnitByCell(x, y);
        if (!unit) {
          this.moveRow({
            orientation: orientation,
            position: {x:x, y:y}
          });
        }
      }
    }
  },

  fillEmptySpots: function() {
    console.log('filluje!');
    this.fillHalfBoard(-1);
    this.fillHalfBoard(1);
  },

  chooseUnits: function(heroes, cb) {
    UTILS.isChoosen = true;
    heroes.forEach(function(hero) {
      hero.element.addClass('highlight');
      hero.element.on('click', function heroAction() {
          console.log('hue hue');
          heroes.forEach(function(hero) {
          hero.element.removeClass('highlight');
          // this is bullshit and should be fixed somehow...
          hero.element.off();
          hero.attachEvents();
        });
        UTILS.isChoosen = false;
        cb(hero);
      });
    });
  }
};
