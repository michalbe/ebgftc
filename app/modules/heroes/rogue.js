GAME.heroes.Rogue = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 3, y: 3 };
  this.name = 'Rogue';
  
  return this;
};

GAME.heroes.Rogue.prototype = Object.create(GAME.heroes.BasicHero.prototype);
