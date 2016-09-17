HEROES.Dustin = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.dustin;
  this.name = 'Dustin Hoffman';
  this.special = '<br/>Removes friendly<br/>hero from the same<br/>row';

  this.attack = function(cb) {
    var self = this;
    var affectedUnits = UTILS.getUnitsHorizontaly(this.position.y);

    affectedUnits = affectedUnits.filter(function(unit) {
      return unit.orientation === self.orientation;
    });

    UTILS.chooseUnits(affectedUnits, function(unit) {
      unit.alive = false;
      unit.element.remove();
      UTILS.fillHalfBoard(self.orientation);
      cb();
    });
  };

  return this;
};

HEROES.Dustin.prototype = Object.create(HEROES.BasicHero.prototype);
