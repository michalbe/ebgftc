GAME.heroes.Sorcerer = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 1, y: 2 };
  this.name = 'Sorcerer';
  
  return this;
};

GAME.heroes.Sorcerer.prototype = Object.create(GAME.heroes.BasicHero.prototype);
