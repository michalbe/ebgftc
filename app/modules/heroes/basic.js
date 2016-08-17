/*jshint browser: true*/
var HEROES = {};

HEROES.BasicHero = function() {
  'use strict';
  this.width = 36;//48;//84;
  this.height = 36;//48; //84;
  this.sprite = 0;
  this.name = 'Basic Hero';

  this.position = { x: 0, y: 0 };

  // 1 for left
  // -1 for right
  this.orientation = 1;
  this.cost = 1;

  // is this the same as attackPower?
  this.damage = 1;
  this.hp = 2;
  this.maxHp = this.hp;
  this.rechargeTime = 2;
  this.isRecharging = false;
  this.alive = true;

  this.attack = function(cb) {
    cb();
  };

  this.rechargeStart = function() {
    this.isRecharging = true;
    this.element.addClass('recharge');
    TURNS.makeAction();
  };

  this.rechargeStop = function() {
    if (this.isRecharging) {
      LOG.ua(this.name + ' is recharged!');
      this.isRecharging = false;
      this.element.removeClass('recharge');
      this.afterRecharge();
      return true;
    }

    return false;
  };

  this.afterRecharge = function() { };

  this.init = function() {
    this.maxHp = this.hp;
    this.element = $('<div class="hero"></div>')
      .css({
        zIndex: 100,
        width: this.width,
        height: this.height,
        backgroundImage: 'url(' + GFX[this.sprite] + ')'
      })
      .attr('title', 'x:' + this.position.x + ', y:', this.position.y);

    this.hpBar = $('<div></div>').addClass('hp').appendTo(this.element);

    GAME.heroContainer.append(this.element);
    this.element.on('click', _.bind(this.handleClick, this));
  };

  this.render = function(cb) {
    // var self = this;
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
    .attr('title', 'x:' + this.position.x + ', y:' + this.position.y);
    if (this.orientation < 0) {
      this.element.addClass('flipped');
    }

  };

  this.teleportTo = function(x, y) {
    this.position = {
      x: x,
      y: y
    };

    this.element.css({
      top: y * this.height + 'px',
      left: x * (this.width+5) + 'px'
    });
  },

  this.moveTo = function(x, y, cb) {
    this.position = {
      x: x,
      y: y
    };

    this.render(cb);
  };

  this.updateHpBar = function() {
    this.hpBar.css({
      width: ((this.hp/this.maxHp)*100) + '%'
    });
  };

  this.getWound = function(power, cb) {
    LOG.ua(this.name + ' gets ' + power + ' wound(s)');
    this.element.removeClass('wounded');
    UTILS.shake();
    this.element.addClass('wounded');
    this.hp -= power;
    this.updateHpBar();

    if (this.hp < 1) {
      this.die();
    }

    if (typeof cb === 'function') {
      cb();
    }
  };

  this.die = function() {
    this.alive = false;
    LOG.ua(this.name + ' died!');
    this.element.fadeOut(function() {
      UTILS.fillEmptySpots();
    });
  };

  this.handleClick = function() {
    console.log(TURNS.getPlayer());
    var self = this;
    if (this.orientation !== TURNS.getPlayer()) {
      return;
    }
    if (!self.isRecharging && (TURNS.isActionState() || TURNS.isMovementState())) {
      LOG.ua(this.name + ' attacks');
      this.attack(_.bind(this.rechargeStart, this));
    }
  };

  return this;
};
