GAME.heroes.ITSupport = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 0;
  this.name = 'ITSupport';

  this.cost = 1;
  return this;
};

GAME.heroes.ITSupport.prototype = Object.create(GAME.heroes.BasicHero.prototype);
