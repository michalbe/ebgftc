HEROES.Watchmaker = function() {
  'use strict';

  HEROES.ConstructionWorker.call(this);
  this.sprite = gfxMAP.watchmaker;
  this.name = 'Watchmaker';
  this.attackRange = 3;
  this.special = '<br/>No initial recharge';
  var basicInit = this.init;
  this.init = function() {
    basicInit.call(this);
    this.currentRechargeCount = this.rechargeTime -1;
  };

  return this;
};

HEROES.Watchmaker.prototype = Object.create(HEROES.BasicHero.prototype);
