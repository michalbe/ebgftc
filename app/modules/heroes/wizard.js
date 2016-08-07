GAME.heroes.Wizard = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 4, y: 0 };

  return this;
};

GAME.heroes.Wizard.prototype = Object.create(GAME.heroes.BasicHero.prototype);
