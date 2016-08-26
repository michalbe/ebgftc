HEROES.Smith = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.width = this.height = 48;
  this.sprite = gfxMAP.smith;
  this.name = 'Smith';
  this.hp = 2;

  return this;
};

HEROES.Smith.prototype = Object.create(HEROES.BasicHero.prototype);
