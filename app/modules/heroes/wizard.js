GAME.heroes.Wizard = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 2, y: 3 };
  this.name = 'Wizard';
  
  return this;
};

GAME.heroes.Wizard.prototype = Object.create(GAME.heroes.BasicHero.prototype);
