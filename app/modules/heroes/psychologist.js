GAME.heroes.Psychologist = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 4;
  this.name = 'Psychologist';

  return this;
};

GAME.heroes.Psychologist.prototype = Object.create(GAME.heroes.BasicHero.prototype);
