HEROES.Psychologist = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 4;
  this.name = 'Psychologist';

  this.cost = 5;
  return this;
};

HEROES.Psychologist.prototype = Object.create(HEROES.BasicHero.prototype);
