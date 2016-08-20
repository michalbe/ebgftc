HEROES.Electrician = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 3;
  this.name = 'Electrician';

  this.cost = 1;
  this.attackRange = 5;
  this.attackPower = 1;
  this.hp = 2;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      var projectile = new PROJECTILES.Bulb();
      console.log(this.position);
      projectile.init(this.position.x, this.position.y);
      projectile.render();
      // this.moveTo(enemy.position.x, enemy.position.y, function() {
      //   enemy.getWound(self.attackPower, function() {
      //     self.moveTo(tempX, self.position.y);
      //     if (typeof cb === 'function') {
      //       cb();
      //     }
      //   });
      // });
    }
  };

  return this;
};

HEROES.Electrician.prototype = Object.create(HEROES.BasicHero.prototype);
