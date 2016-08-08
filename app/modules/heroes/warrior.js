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
    var tempY = this.position.y;
    console.log('pierwej', this.position);
    console.log('pierwej', tempY);
    var affectedEnemies = GAME.utils.getEnemiesHorizontaly(
      this
    );

    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      // enemy.element.removeClass('wounded');
      this.moveTo(enemy.position.x, enemy.position.y, function() {
        GAME.utils.shake();
        enemy.element.addClass('wounded');
        self.moveTo(self.position.x, tempY, function() {
          enemy.element.removeClass('wounded');
        });
      });
    }
  };
  return this;
};

GAME.heroes.Warrior.prototype = Object.create(GAME.heroes.BasicHero.prototype);
