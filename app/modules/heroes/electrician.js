HEROES.Electrician = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 3;
  this.name = 'Electrician';

  this.cost = 1;
  return this;
};

HEROES.Electrician.prototype = Object.create(HEROES.BasicHero.prototype);
