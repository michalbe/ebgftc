HEROES.Plumber = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.plumber;
  this.name = 'Plumber';

  this.cost = 4;
  this.attackRange = 10;
  this.attackPower = 1;
  this.special = '<br/>Reverse enemy\'s<br/>row order';
  // this.rechargeTime = 3;
  // this.hp = 1;

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);
    var positions = affectedEnemies.map(function(a) {
      return a.position;
    });
    positions.reverse();
    if (affectedEnemies.length > 0) {
      // affectedEnemies.reverse();
      this.moveTo(affectedEnemies[0].position.x, affectedEnemies[0].position.y, function() {
        UTILS.shake();
        affectedEnemies.forEach(function(enemy, index) {
          enemy.moveTo(positions[index].x, enemy.position.y, (function(index) {
            if (index === 0) {
              self.moveTo(tempX, self.position.y);
            }
            if (index === affectedEnemies.length - 1) {
              setTimeout(function() {
                UTILS.fillEmptySpots();
              }, 300);
              if (typeof cb === 'function') {
                cb();
              }
            }
          })(index));
        });
      });
    } else {
      LOG.ua(this.name + ' has no one to attack');
      //cb();
    }
  };

  return this;
};

HEROES.Plumber.prototype = Object.create(HEROES.BasicHero.prototype);
