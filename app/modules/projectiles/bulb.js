PROJECTILES.Bulb = function() {
  'use strict';

  PROJECTILES.BasicProjectile.call(this);
  this.sprite = 5;

  this.moveTo = function(x, y, cb) {
    this.position = {
      x: this.element.offset().left,
      y: this.element.offset().top
    };

    var cell = $('#GameBoard td[data-cell="' + x + '-' + y +'"]');
    x = cell.offset().left + (cell.width()/2) - (this.width/2);
    y = cell.offset().top + (cell.height()/2) - (this.height/2);

    var startY = this.position.y;
    var centerX = (this.position.x + x)/2;
    var angle = this.orientation > 0 ? 0 : Math.PI;
    var radius = Math.abs(this.position.x - x)/2;
    var deltaAngle = 0.1 * this.orientation;
    var endAngle = this.orientation > 0 ? Math.PI : 0;

    while(this.orientation > 0 ? angle <= endAngle : angle > endAngle) {
      this.position = {
        x: centerX + (Math.cos(angle)*radius),
        y: startY - (Math.sin(angle)*radius)
      };

      this.renderPixels(angle, cb, endAngle, deltaAngle);

      angle += deltaAngle;
    }
  };

  this.renderPixels = function(angle, cb, endAngle, deltaAngle) {
    var self = this;
    this.element.animate({
      top: this.position.y,
      left: this.position.x
    }, 10, function() {
      if (
        typeof cb === 'function' &&
        (self.orientation > 0 ? (angle + deltaAngle >= endAngle) : (angle + deltaAngle < endAngle))
      ) {
        cb();
      }
    });
  };

  return this;
};

PROJECTILES.Bulb.prototype = Object.create(PROJECTILES.BasicProjectile.prototype);
