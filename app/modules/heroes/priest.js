HEROES.Priest = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.priest;
  this.name = 'Priest';

  this.attack = function(cb) {
    var self = this;
    var affectedUnits = UTILS.getUnitsHorizontaly(this.position.y);

    affectedUnits = affectedUnits.filter(function(unit) {
      return unit.orientation !== self.orientation && !unit.priested;
    });

    UTILS.chooseUnits(affectedUnits, function(unit) {
      UTILS.shake();
      var vp = unit.vp*-2;
      unit.changeVp(vp);
      unit.priested = true;
      cb();
    });
  };

  return this;
};

HEROES.Priest.prototype = Object.create(HEROES.BasicHero.prototype);
