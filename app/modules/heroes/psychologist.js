HEROES.Psychologist = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.psyho;
  this.name = 'Psychologist';

  this.cost = 5;
  return this;
};

HEROES.Psychologist.prototype = Object.create(HEROES.BasicHero.prototype);
