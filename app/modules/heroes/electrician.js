HEROES.Electrician = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 3;
  this.name = 'Electrician';

  this.cost = 1;
  this.attackRange = 4;
  this.attackPower = 1;
  this.hp = 2;

  this.attack = function(cb) {
    var self = this;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      var projectile = new PROJECTILES.Bulb();
      projectile.init(this.position.x, this.position.y, this.orientation);
      projectile.moveTo(enemy.position.x, enemy.position.y, function() {
        enemy.getWound(self.attackPower, cb);
        projectile.remove(function() {
          projectile = null;
        });
      });
    }
  };

  return this;
};

HEROES.Electrician.prototype = Object.create(HEROES.BasicHero.prototype);
