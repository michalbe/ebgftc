GAME.heroes.ConstructionWorker = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 2;
  this.name = 'Construction Worker';

  this.attackRange = 3;
  this.attackPower = 1;
  this.hp = 2;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = GAME.utils.getUnitsHorizontaly(this);

    console.log(affectedEnemies);
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
    }
  };
  return this;
};

GAME.heroes.ConstructionWorker.prototype = Object.create(GAME.heroes.BasicHero.prototype);
