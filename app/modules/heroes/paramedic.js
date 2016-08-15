GAME.heroes.Paramedic = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 1;
  this.name = 'Paramedic';

  return this;
};

GAME.heroes.Paramedic.prototype = Object.create(GAME.heroes.BasicHero.prototype);
