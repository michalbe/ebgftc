GAME.heroes.Warrior = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 0, y: 0 };
  this.name = 'Warrior';

  this.attackRange = 3;
  this.attackPower = 1;
  this.hp = 5;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    console.log('pierwej', this.position);
    var affectedEnemies = GAME.utils.getEnemiesHorizontaly(
      this
    );

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      this.moveTo(enemy.position.x, enemy.position.y, function() {
        enemy.getWound(self.attackPower, function() {
          self.moveTo(tempX, self.position.y);
        });
      });
    }
  };
  return this;
};

GAME.heroes.Warrior.prototype = Object.create(GAME.heroes.BasicHero.prototype);
