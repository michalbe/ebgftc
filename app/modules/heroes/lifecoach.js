HEROES.LifeCoach = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.coach;
  this.name = 'Life Coach';
  this.vp = 3;
  this.special = '<br/>Starts with 3VP';

  return this;
};

HEROES.LifeCoach.prototype = Object.create(HEROES.BasicHero.prototype);
