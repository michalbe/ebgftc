HEROES.ConstructionWorker = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 2;
  this.name = 'Construction Worker';

  this.cost = 1;
  this.attackRange = 6;
  this.attackPower = 1;
  this.hp = 1;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      this.moveTo(enemy.position.x, enemy.position.y, function() {
        enemy.getWound(self.attackPower, function() {
          self.moveTo(tempX, self.position.y);
          if (typeof cb === 'function') {
            cb();
          }
        });
      });
    } else {
      cb();
    }
  };
  return this;
};

HEROES.ConstructionWorker.prototype = Object.create(HEROES.BasicHero.prototype);
