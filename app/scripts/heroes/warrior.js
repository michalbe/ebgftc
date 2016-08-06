define([
  './basic'
], function(BasicHero) {
    'use strict';

    var Warrior = function() {
      BasicHero.call(this);
      this.spritePosition = { x: 2, y: 1 };

      return this;
    };

    Warrior.prototype = Object.create(BasicHero.prototype);

    return Warrior;
});
