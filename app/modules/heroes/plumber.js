GAME.heroes.Plumber = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.sprite = 5;
  this.name = 'Plumber';

  this.attackRange = 12;
  this.attackPower = 1;
  this.hp = 1;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = GAME.utils.getUnitsHorizontaly(this);
    console.log(affectedEnemies);
    if (affectedEnemies.length > 0) {
      var moveTo = this.orientation > 0 ? 0 : GAME.board.cols-1;
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

GAME.heroes.Plumber.prototype = Object.create(GAME.heroes.BasicHero.prototype);
