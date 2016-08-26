HEROES.Watchmaker = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.watchmaker;
  this.name = 'Watchmaker';

  return this;
};

HEROES.Watchmaker.prototype = Object.create(HEROES.BasicHero.prototype);
