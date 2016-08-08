/*jshint browser: true*/
GAME.heroes = GAME.heroes || {};

GAME.heroes.BasicHero = function() {
  'use strict';
  this.width = 78;
  this.height = 90;
  this.sprite = 'sprite.png';
  this.spritePosition = { x: 0, y:0 };
  this.name = 'Basic Hero';

  this.position = { x: 0, y: 0 };

  // 1 for left
  // -1 for right
  this.orientation = 1;
  this.damage = 1;
  this.hp = 2;
  this.rechargeTime = 2;
  this.isRecharging = false;
  this.alive = true;

  this.attack = function() {
    console.log('attack!');
  };

  this.recharge = function() {

  };

  this.afterRecharge = function() { };

  this.init = function() {
    var self = this;
    var spriteX = (-1 * this.spritePosition.x * this.width);
    var spriteY = (-1 * this.spritePosition.y * this.height);
    this.element = $('<div class="hero"></div>')
      .css({
        zIndex: 100,
        width: this.width,
        height: this.height,
        backgroundImage: 'url(../img/' + this.sprite + ')',
        backgroundPosition: spriteX + 'px ' + spriteY + 'px'
      })
      .attr('title', this.name);
    $('body').append(this.element);
    this.element.on('click', _.bind(this.handleClick, this));
  };

  this.render = function(cb) {
    var self = this;
    var cell = $('#GameBoard td[data-cell="' + this.position.x + '-' + this.position.y +'"]');
    var cellOffset = cell.offset();
    this.element.animate({
      top: cellOffset.top + ((cell.height() - this.height)/2),
      left: cellOffset.left + ((cell.width() - this.width)/2),
    }, function() {
      if (typeof cb === 'function') {
        cb();
      }
    })
    .css({
      transform: 'scale(' + this.orientation + ', 1)'
    });
  };

  this.moveTo = function(x, y, cb) {
    this.position = {
      x: x,
      y: y
    };

    console.log('moveto', x, y);

    this.render(cb);
  };

  this.getWound = function(power, cb) {
    this.element.removeClass('wounded');
    GAME.utils.shake();
    this.element.addClass('wounded');
    this.hp -= power;
    if (this.hp < 1) {
      this.die();
    }

    if (typeof cb === 'function') {
      cb();
    }
  };

  this.die = function() {
    var self = this;
    this.alive = false;
    this.element.fadeOut(function() {
      GAME.utils.moveRow(self);
    });
  };

  this.handleClick = function() {
    var self = this;
    if (self.isRecharging) {
      return;
    }

    this.attack(this.recharge);
  };

  return this;
};
