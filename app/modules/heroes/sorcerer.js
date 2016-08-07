GAME.heroes.Sorcerer = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 2, y: 0 };

  return this;
};

GAME.heroes.Sorcerer.prototype = Object.create(GAME.heroes.BasicHero.prototype);
