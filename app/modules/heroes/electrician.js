GAME.heroes.Electrician = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 3;
  this.name = 'Electrician';

  this.cost = 1;
  return this;
};

GAME.heroes.Electrician.prototype = Object.create(GAME.heroes.BasicHero.prototype);
