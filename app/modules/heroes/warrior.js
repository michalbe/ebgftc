GAME.heroes.Warrior = function() {
  'use strict';

  GAME.heroes.BasicHero.call(this);
  this.spritePosition = { x: 0, y: 0 };
  this.name = 'Warrior';

  this.attackRange = 10;

  this.attack = function(cb) {
    var tempY = this.position.y;
    console.log('pierwej', this.position);
    console.log('pierwej', tempY);
    var affectedEnemies = GAME.utils.getEnemiesHorizontaly(
      this.position,
      this.attackRange + 1,
      this.orientation
    );

    if (affectedEnemies.length > 0) {
      this.moveTo(affectedEnemies[0].position.x, affectedEnemies[0].position.y);

      setTimeout(_.bind(function() {
        GAME.utils.shake();
      }, this), 300);

      setTimeout(_.bind(function() {
        this.moveTo(this.position.x, tempY);
      }, this), 500);
    }
  };
  return this;
};

GAME.heroes.Warrior.prototype = Object.create(GAME.heroes.BasicHero.prototype);
