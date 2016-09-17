HEROES.CableTv = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.cabletv;
  this.name = 'Cable TV Guy';
  this.special = '<br/>+1 buy';

  this.attack = function(cb) {
    BUYSCREEN.show(cb);
  };

  return this;
};

HEROES.CableTv.prototype = Object.create(HEROES.BasicHero.prototype);
