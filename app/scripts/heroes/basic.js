/*jshint browser: true*/

define(function() {
    'use strict';

    var BasicHero = function() {
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
      this.hp = 5;
      this.rechargeTime = 2;
      this.isRecharging = false;

      this.attack = function() {
        console.log('attack!');
      };

      this.afterRecharge = function() { };

      this.init = function() {
        var spriteX = (-1 * this.spritePosition.x * this.width);
        var spriteY = (-1 * this.spritePosition.y * this.height);
        this.element = $('<div style="position:absolute"></div>')
          .css({
            zIndex: 100,
            width: this.width,
            height: this.height,
            backgroundImage: 'url(../img/' + this.sprite + ')',
            backgroundPosition: spriteX + 'px ' + spriteY + 'px'
          });
        $('body').append(this.element);
        this.element.on('click', _.bind(this.handleClick, this));
      };

      this.render = function() {
        var cell = $('#GameBoard td[data-cell="' + this.position.x + '-' + this.position.y +'"]');
        var cellOffset = cell.offset();
        this.element.animate({
          top: cellOffset.top + ((cell.height() - this.height)/2),
          left: cellOffset.left + ((cell.width() - this.width)/2),
        })
        .css({
          transform: 'scale(' + this.orientation + ', 1)'
        });
      };

      this.moveTo = function(x, y) {
        this.position = {
          x: x,
          y: y
        };

        this.render();
      };

      this.handleClick = function() {};

      return this;
    };

    return BasicHero;
});
