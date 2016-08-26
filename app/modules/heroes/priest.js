HEROES.Priest = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.priest;
  this.name = 'Priest';

  return this;
};

HEROES.Priest.prototype = Object.create(HEROES.BasicHero.prototype);
