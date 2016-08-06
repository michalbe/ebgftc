/*jshint browser: true*/

define(function() {
    'use strict';

    var BaseHero = function() {
      var self = this;

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

      this.element = $('<div></div>')
        .css({
          zIndex: 100,
          position: 'absolute',
          width: this.width,
          height: this.height,
          backgroundImage: 'url(../img/' + this.sprite + ')',
          backgroundPosition: (-1 * this.spritePosition.x * this.width) + ' ' + (-1 * this.spritePosition.y * this.height)
        });

      $('body').append(this.element);

      this.render = function() {
        var cell = $('#GameBoard td[data-cell="' + this.position.x + '-' + this.position.y +'"]');
        var cellOffset = cell.offset();
        this.element.css({
          top: cellOffset.top + ((cell.height() - this.height)/2),
          left: cellOffset.left + ((cell.width() - this.width)/2),
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

      this.element.on('click', function() {
        self.moveTo(1, 8);
      });
    };

    return BaseHero;
});
