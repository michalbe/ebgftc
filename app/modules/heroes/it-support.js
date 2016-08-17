HEROES.ITSupport = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 0;
  this.name = 'ITSupport';

  this.cost = 1;
  return this;
};

HEROES.ITSupport.prototype = Object.create(HEROES.BasicHero.prototype);
