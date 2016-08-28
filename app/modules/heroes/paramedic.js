HEROES.Paramedic = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.medic;
  this.name = 'Paramedic';
  this.special = '<br/>Activates friendly<br/>hero from the same<br/>column';

  this.attack = function(cb) {
    var affectedUnits = UTILS.getUnitsVertically(this.position.x);


    UTILS.chooseUnits(affectedUnits, function(unit) {
      unit.currentRechargeCount = unit.rechargeTime-1;
      unit.rechargeStop();
      cb();
    });
  };

  return this;
};

HEROES.Paramedic.prototype = Object.create(HEROES.BasicHero.prototype);
