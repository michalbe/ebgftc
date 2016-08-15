GAME.heroes.Mage = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 4;
  this.name = 'Mage';

  return this;
};

GAME.heroes.Mage.prototype = Object.create(GAME.heroes.BasicHero.prototype);
