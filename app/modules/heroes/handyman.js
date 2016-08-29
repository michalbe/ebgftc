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
      return unit.orientation === self.orientation && unit.name !== self.name && !unit.isRecharging;
    });

    if (affectedUnits.length > 0) {
      UTILS.chooseUnits(affectedUnits, function(unit) {
        // TURNS.addAction(1);

        SYSTEM.asyncForEach([unit.attack, unit.attack], function(attack, next) {
          attack.bind(unit)(next);
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
