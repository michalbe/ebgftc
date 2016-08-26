HEROES.LifeCoach = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.coach;
  this.name = 'Life Coach';

  return this;
};

HEROES.LifeCoach.prototype = Object.create(HEROES.BasicHero.prototype);
