HEROES.Tailor = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.tailor;
  this.name = 'Tailor';
  this.special = 'Change same<br/>row hero\'s VP to 0';

  this.attack = function(cb) {
    var affectedUnits = UTILS.getUnitsHorizontaly(this.position.y);

    UTILS.chooseUnits(affectedUnits, function(unit) {
      UTILS.shake();
      unit.changeVp(unit.vp*-1);
      cb();
    });
  };

  return this;
};

HEROES.Tailor.prototype = Object.create(HEROES.BasicHero.prototype);
