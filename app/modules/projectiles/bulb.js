PROJECTILES.Bulb = function() {
  'use strict';

  PROJECTILES.BasicProjectile.call(this);
  this.sprite = 3;

  this.moveTo = function(x, y, cb) {
    var self = this;
    var speed = 5;
    this.position = {
      x: this.element.offset().left,
      y: this.element.offset().top
    };

    var cell = $('#GameBoard td[data-cell="' + x + '-' + y +'"]');
    x = cell.offset().left;
    y = cell.offset().top;

    var distance = Math.sqrt(Math.pow(x - this.position.x, 2) + Math.pow(y - this.position.y, 2));
    var ind = 2;
    while(Math.round(this.position.x) > x) {
      this.position = {
        x: distance/ind,
        y: y
      };

      this.renderPixels();
      ind--;
    }
  };

  this.renderPixels = function(cb) {
    console.log(this.position);
    this.element.animate({
      top: this.position.y,
      left: this.position.x
    }, 500, function() {
      if (typeof cb === 'function') {
        cb();
      }
    });
  };

  return this;
};

PROJECTILES.Bulb.prototype = Object.create(PROJECTILES.BasicProjectile.prototype);
