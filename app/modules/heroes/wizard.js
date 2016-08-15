GAME.heroes.Wizard = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 1;
  this.name = 'Wizard';

  return this;
};

GAME.heroes.Wizard.prototype = Object.create(GAME.heroes.BasicHero.prototype);
