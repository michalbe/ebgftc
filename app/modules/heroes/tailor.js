HEROES.Tailor = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.tailor;
  this.name = 'Tailor';

  return this;
};

HEROES.Tailor.prototype = Object.create(HEROES.BasicHero.prototype);
