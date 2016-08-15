GAME.heroes.Sorcerer = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 0;
  this.name = 'Sorcerer';

  return this;
};

GAME.heroes.Sorcerer.prototype = Object.create(GAME.heroes.BasicHero.prototype);
