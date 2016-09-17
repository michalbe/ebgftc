HEROES.CarRepair = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.vp = -1;
  this.sprite = gfxMAP.carrepair;
  this.name = 'Car Repair';
  this.special = '<br/>+2 actions <br/>-1 VP';

  this.addAction = function(count) {
    TURNS.addAction(count);
    LOG.ua('+1 action(s) from ' + this.name);
  };

  this.attack = function(cb) {
    this.showToken('+2A');
    this.addAction(2);
    LOG.ua(this.name + ' has no one to attack');
    cb();
  };

  return this;
};

HEROES.CarRepair.prototype = Object.create(HEROES.BasicHero.prototype);
