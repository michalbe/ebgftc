define([
  './basic'
], function(BasicHero) {
    'use strict';

    var Hero = function() {
      BasicHero.call(this);
      this.spritePosition = { x: 1, y: 0 };

      return this;
    };

    Hero.prototype = Object.create(BasicHero.prototype);

    return Hero;
});
