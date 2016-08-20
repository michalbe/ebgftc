PROJECTILES.Bulb = function() {
  'use strict';

  PROJECTILES.BasicProjectile.call(this);
  this.sprite = 3;

  return this;
};

PROJECTILES.Bulb.prototype = Object.create(PROJECTILES.BasicProjectile.prototype);
