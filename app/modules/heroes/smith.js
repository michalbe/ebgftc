HEROES.Smith = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.width = this.height = 48;
  this.sprite = gfxMAP.smith;
  this.name = 'Smith';
  this.hp = 2;

  this.attack = function() {
    LOG.ua(this.name + ' cannot attack...');
  };
  return this;
};

HEROES.Smith.prototype = Object.create(HEROES.BasicHero.prototype);
