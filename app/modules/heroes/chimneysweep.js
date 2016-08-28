HEROES.ChimneySweep = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.chimneysweep;
  this.name = 'Chimney Sweep';

  this.special = '<br/>Reverse friendly<br/>row\'s order';

  this.attack = function(cb) {
    var self = this;
    var affectedHeroes = UTILS.getUnitsHorizontaly(this.position.y);
    affectedHeroes = affectedHeroes.filter(function(hero) {
      return hero.orientation === self.orientation;
    });

    affectedHeroes.sort(function(a, b) {
      return a.position.x - b.position.x;
    });
    var positions = affectedHeroes.map(function(a) {
      return a.position;
    });


    positions.reverse();
    if (affectedHeroes.length > 0) {
        affectedHeroes.forEach(function(hero, index) {
          hero.moveTo(positions[index].x, hero.position.y, (function(index) {
            if (index === affectedHeroes.length - 1) {
              setTimeout(function() {
                UTILS.fillEmptySpots();
              }, 300);
              if (typeof cb === 'function') {
                cb();
              }
            }
          })(index));
        });
    } else {
      LOG.ua(this.name + ' has no one to attack');
      //cb();
    }
  };

  return this;
};

HEROES.ChimneySweep.prototype = Object.create(HEROES.BasicHero.prototype);
