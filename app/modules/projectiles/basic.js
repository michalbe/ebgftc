/*jshint browser: true*/
var PROJECTILES = {};

PROJECTILES.BasicProjectile = function() {
  'use strict';
  this.width = 20;
  this.height = 20;
  this.sprite = 0;

  this.position = { x: 0, y: 0 };

  this.init = function(x, y, orientation) {
    this.position = {
      x: x,
      y: y
    };

    this.orientation = orientation;
    
    var cell = $('#GameBoard td[data-cell="' + x + '-' + y +'"]');
    var cellOffset = cell.offset();

    this.element = $('<div class="projectile"></div>')
      .css({
        zIndex: 100,
        width: this.width,
        height: this.height,
        backgroundImage: 'url(' + GFX[this.sprite] + ')',
        top: cellOffset.top + ((cell.height() - this.height)/2),
        left: cellOffset.left + ((cell.width() - this.width)/2)
      });
    GAME.heroContainer.append(this.element);
  };

  this.render = function(cb) {
    var cell = $('#GameBoard td[data-cell="' + this.position.x + '-' + this.position.y +'"]');
    var cellOffset = cell.offset();
    this.element.animate({
      top: cellOffset.top + ((cell.height() - this.height)/2),
      left: cellOffset.left + ((cell.width() - this.width)/2),
    }, function() {
      if (typeof cb === 'function') {
        cb();
      }
    });
  };

  this.moveTo = function(x, y, cb) {
    this.position = {
      x: x,
      y: y
    };

    this.render(cb);
  };

  this.remove = function(cb) {
    this.element.remove();
    cb();
  };
  return this;
};
