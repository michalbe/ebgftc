HEROES.ConstructionWorker = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.construction;
  this.name = 'Builder';
  this.cost = 1;
  this.attackRange = 2;
  this.attackPower = 1;
  // this.hp = 1;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      this.moveTo(enemy.position.x, enemy.position.y, function() {
        enemy.getWound(self, function() {
          self.moveTo(tempX, self.position.y);
          if (typeof cb === 'function') {
            cb();
          }
        });
      });
    } else {
      LOG.ua(this.name + ' has no one to attack');
      //cb();
    }
  };
  return this;
};

HEROES.ConstructionWorker.prototype = Object.create(HEROES.BasicHero.prototype);
