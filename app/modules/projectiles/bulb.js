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

    var startX = this.position.x;
    var startY = this.position.y;
    var centerX = Math.abs(startX + x)/2;
    var ind = 0;
    var angle = 0;
    var radius = Math.abs(startX - x)/2;
    while(angle < Math.PI) {
      this.position = {
        x: centerX + (Math.cos(angle)*radius),
        y: startY - (Math.sin(angle)*radius)
      };

      this.renderPixels();

      angle += 0.1;
      ind++;
    }
  };

  this.renderPixels = function(cb) {
    console.log(this.position);
    this.element.animate({
      top: this.position.y,
      left: this.position.x
    }, 10, function() {
      if (typeof cb === 'function') {
        cb();
      }
    });
  };

  return this;
};

PROJECTILES.Bulb.prototype = Object.create(PROJECTILES.BasicProjectile.prototype);
