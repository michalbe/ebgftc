HEROES.Paramedic = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 1;
  this.name = 'Paramedic';

  this.cost = 3;
  return this;
};

HEROES.Paramedic.prototype = Object.create(HEROES.BasicHero.prototype);
