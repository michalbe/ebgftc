GAME.heroes.Warrior = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 1, y: 0 };

  return this;
};

GAME.heroes.Warrior.prototype = Object.create(GAME.heroes.BasicHero.prototype);
