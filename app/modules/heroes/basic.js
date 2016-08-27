/*jshint browser: true*/

var HEROES = {};
var gfxMAP = {
  it: 0,
  construction: 1,
  plumber: 2,
  electrician: 3,
  medic: 4,
  coach: 5,
  smith: 6,
  watchmaker: 7,
  psyho: 8,
  priest: 9,
  tailor: 10
};

HEROES.BasicHero = function() {
  'use strict';
  this.width = 38;//48;//84;
  this.height = 38;//42;//48; //84;
  this.sprite = 0;
  this.name = 'Basic Hero';

  this.position = { x: 0, y: 0 };

  // 1 for left
  // -1 for right
  this.orientation = 1;
  this.cost = 1;

  this.attackPower = 0;
  this.attackRange = 1;
  this.special = 'None';
  this.hp = 1;
  this.maxHp = this.hp;
  this.rechargeTime = 1;
  this.isRecharging = false;
  this.alive = true;

  this.vp = 0;
  this.token = '';

  this.attack = function(cb) {
    cb();
  };

  this.changeVp = function(count) {
    count = count || 1;
    this.vp += count;
    this.showToken((count > 0 ? '+' : '') + count + 'VP');
    this.vpToken.html(this.vp);
    if (this.vp === 0) {
      this.vpToken.removeClass('show');
    } else {
      this.vpToken.addClass('show');
    }
  };

  this.rechargeStart = function() {
    this.currentRechargeCount = 0;
    this.isRecharging = true;
    this.element.addClass('recharge');
  };

  this.rechargeStop = function() {
    this.currentRechargeCount++;
    if (this.isRecharging) {
      if (this.currentRechargeCount === this.rechargeTime) {
        this.showToken('RE!');
        LOG.ua(this.name + ' is recharged!');
        this.isRecharging = false;
        this.element.removeClass('recharge');
        this.afterRecharge();
        return true;
      } else {
        this.showToken(this.rechargeTime - this.currentRechargeCount + 'RE');
        LOG.ua(this.name + ' is recharging. ' + (this.rechargeTime - this.currentRechargeCount) + ' more turns.');
      }

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

    // this.hpBar = $('<div></div>').addClass('hp').appendTo(this.element);
    this.token = $('<div class="token"></div>').appendTo(this.element);
    this.vpToken = $('<div class="vp"></div>').appendTo(this.element);

    GAME.heroContainer.append(this.element);
    this.element.on('click', _.bind(this.handleClick, this));
    this.rechargeStart();
    this.currentRechargeCount = this.rechargeTime - 2;
  };

  this.render = function(cb) {
    // var self = this;
    var cell = $('#GameBoard td[data-cell="' + this.position.x + '-' + this.position.y +'"]');
    var cellOffset;
    if (cell.length === 0) {
      cell = $('#GameBoard td[data-cell="' + (this.orientation > 0 ? this.position.x-1 : this.position.x+1) + '-' + this.position.y +'"]');
      var diff = this.orientation > 0 ? cell.width() : cell.width()*-1;
      cellOffset = {
        top: cell.offset().top,
        left: cell.offset().left + diff
      };
    } else {
      cellOffset = cell.offset();
    }
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

  this.showToken = function(message) {
    var self = this;
    this.token.removeClass('show');
    this.token.html(message);
    setTimeout(function(){
      self.token.addClass('show');
    }, 100);
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

  // this.updateHpBar = function() {
  //   this.hpBar.css({
  //     width: ((this.hp/this.maxHp)*100) + '%'
  //   });
  // };

  this.getWound = function(attacker, cb) {
    var power = attacker.attackPower;
    LOG.ua(this.name + ' gets ' + power + ' wound(s)');
    this.element.removeClass('wounded');
    UTILS.shake();
    this.element.addClass('wounded');
    this.showToken('-' + power + 'HP');
    this.hp -= power;
    // this.updateHpBar();

    if (this.hp < 1) {
      this.die();
      console.log(attacker);
      attacker.changeVp(1);
      if (this.vp > 0) {
        this.changeVp(-1);
      }
    }

    if (typeof cb === 'function') {
      cb();
    }
  };

  this.addHp = function(hp, cb) {
    this.hp += hp;
    LOG.ua(this.name + ' gets +' + hp + ' HP.');
    this.showToken('+' + hp + 'HP');
    this.maxHp = Math.max(this.maxHp, this.hp);
    // this.updateHpBar();
    if (typeof cb === 'function') {
      cb();
    }
  };

  this.die = function() {
    // this.alive = false;
    LOG.ua(this.name + ' was sent to back...');
    // this.element.fadeOut(function() {
    //
    //   UTILS.fillEmptySpots();
    // });
    var self = this;
    this.hp = this.maxHp;

    this.moveTo(this.orientation > 0 ? BOARD.cols : -1, this.position.y, function() {
      self.rechargeStart();
      self.currentRechargeCount = self.rechargeTime - 2;
      UTILS.fillEmptySpots();
    });
  };

  this.handleClick = function() {
    var self = this;
    if (this.orientation !== TURNS.getPlayer()) {
      return;
    }
    if (!self.isRecharging && (TURNS.isActionState() || TURNS.isMovementState())) {
      LOG.ua(this.name + ' attacks');
      this.attack(function() {
        self.rechargeStart();
        TURNS.makeAction();
      });
    }
  };

  return this;
};
