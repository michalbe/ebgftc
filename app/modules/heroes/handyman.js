HEROES.Handyman = function() {
  'use strict';

  HEROES.BasicHero.call(this);
  this.sprite = gfxMAP.handyman;
  this.name = 'Handyman';
  this.special = '<br/>Play same row<br/>hero\'s action twice';

  this.attack = function(cb) {
    var self = this;
    var affectedUnits = UTILS.getUnitsHorizontaly(this.position.y);

    affectedUnits = affectedUnits.filter(function(unit) {
      return unit.orientation === self.orientation && unit !== self && !unit.isRecharging;
    });

    if (affectedUnits.length > 0) {
      UTILS.chooseUnits(affectedUnits, function(unit) {
        // TURNS.addAction(1);

        SYSTEM.asyncForEach([unit.attack, unit.attack], function(attack, callback) {
          console.log('cb', cb);
          attack.bind(unit)(callback);
        }, function() {
          unit.rechargeStart();
          cb();
        });
      });
    } else {
      LOG.ua(this.name + ' has no units to choose!');
    }
  };

  return this;
};

HEROES.Handyman.prototype = Object.create(HEROES.BasicHero.prototype);
