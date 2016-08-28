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

    UTILS.chooseUnits(affectedUnits, function(unit) {
      TURNS.addAction(1);
      unit.attack(function() {
        setTimeout(function() {
          unit.attack(function(){
            unit.rechargeStart();
            TURNS.makeAction();
          });
        }, 400);
      });
      cb();
    });
  };

  return this;
};

HEROES.Handyman.prototype = Object.create(HEROES.BasicHero.prototype);
