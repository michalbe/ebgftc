HEROES.ITSupport = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.it;
  this.name = 'IT Support';
  this.special = '<br/>+2 actions or <br/>+1 action on attack';
  this.attackRange = 2;
  this.attackPower = 1;
  // this.hp = 1;
  this.cost = 3;

  this.addAction = function(count) {
    TURNS.addAction(count);
    LOG.ua('+1 action(s) from ' + this.name);
  };

  this.attack = function(cb) {
    var self = this;
    var tempX = this.position.x;
    var affectedEnemies = UTILS.getUnitsHorizontalyInRange(this);
    if (affectedEnemies.length > 0) {
      var enemy = affectedEnemies[0];
      this.moveTo(enemy.position.x, enemy.position.y, function() {
        self.showToken('+1A');
        self.addAction(1);
        self.moveTo(tempX, self.position.y);
        enemy.getWound(self, function() {
          if (typeof cb === 'function') {
            cb();
          }
        });
      });
    } else {
      self.showToken('+2A');
      self.addAction(2);
      LOG.ua(this.name + ' has no one to attack');
      cb();
    }
  };

  return this;
};

HEROES.ITSupport.prototype = Object.create(HEROES.BasicHero.prototype);
