HEROES.Paramedic = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 1;
  this.name = 'Paramedic';
  this.rechargeTime = 1;
  this.cost = 3;
  this.special = '<br/>+1HP to the column';

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var units = UTILS.getUnitsVertically(this.position.x);

    units.forEach(function(unit) {
      unit.addHp(1);
    });

    cb();
  };

  return this;
};

HEROES.Paramedic.prototype = Object.create(HEROES.BasicHero.prototype);
