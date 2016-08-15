GAME.heroes.Rogue = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 3;
  this.name = 'Rogue';

  return this;
};

GAME.heroes.Rogue.prototype = Object.create(GAME.heroes.BasicHero.prototype);
