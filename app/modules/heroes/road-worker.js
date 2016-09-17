HEROES.RoadWorker = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.roadworker;
  this.name = 'Road Worker';
  this.special = '<br/>attack twice';
  this.attackRange = 2;
  this.attackPower = 1;
  
  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      this.moveTo(enemy.position.x, enemy.position.y, function() {
        self.moveTo(tempX, self.position.y);
        enemy.getWound(self, function() {
          affectedEnemies = UTILS.getUnitsHorizontalyInRange(self);
          enemy = affectedEnemies[0];
          self.moveTo(enemy.position.x, enemy.position.y, function() {
            self.moveTo(tempX, self.position.y);
            enemy.getWound(self, function() {
              if (typeof cb === 'function') {
                cb();
              }
            });
          });
        });
      });
    } else {
      LOG.ua(this.name + ' has no one to attack');
      //cb();
    }
  };
  return this;
};

HEROES.RoadWorker.prototype = Object.create(HEROES.BasicHero.prototype);
