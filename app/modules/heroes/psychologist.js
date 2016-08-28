HEROES.Psychologist = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.psyho;
  this.name = 'Psychologist';
  this.special = '<br/>Deactivate enemy\'s<br/>hero in the same row';

  this.attack = function(cb) {
    var self = this;
    var affectedUnits = UTILS.getUnitsHorizontaly(this.position.y);

    affectedUnits = affectedUnits.filter(function(unit) {
      return unit.orientation !== self.orientation;
    });

    UTILS.chooseUnits(affectedUnits, function(unit) {
      UTILS.shake();
      unit.rechargeStart();
      unit.currentRechargeCount = unit.rechargeTime - 2;
      unit.showToken('-1RE');
      cb();
    });
  };

  return this;
};

HEROES.Psychologist.prototype = Object.create(HEROES.BasicHero.prototype);
