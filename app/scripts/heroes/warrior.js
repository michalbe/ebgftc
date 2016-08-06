define([
  './basic'
], function(BasicHero) {
    'use strict';

    var Warrior = function() {
      this.spritePosition = { x: 2, y: 0 };

      return this;
    };

    Warrior.prototype = new BasicHero();

    return Warrior;
});
