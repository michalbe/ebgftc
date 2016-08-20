HEROES.Plumber = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = 5;
  this.name = 'Plumber';

  this.cost = 4;
  this.attackRange = 12;
  this.attackPower = 1;
  this.rechargeTime = 2;
  this.hp = 1;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);
    console.log(affectedEnemies);
    if (affectedEnemies.length > 0) {
      var moveTo = this.orientation > 0 ? 0 : BOARD.cols-1;
      this.moveTo(moveTo, self.position.y, function() {
          self.moveTo(tempX, self.position.y);
          affectedEnemies.forEach(function(enemy) {
            enemy.getWound(self.attackPower);
          });
        // enemy.getWound(self.attackPower, function() {
          if (typeof cb === 'function') {
            cb();
          }
        // });
      });
    }
  };

  return this;
};

HEROES.Plumber.prototype = Object.create(HEROES.BasicHero.prototype);
