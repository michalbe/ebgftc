/*jshint browser: true*/

require(
  [
    './board/board',
    './heroes/basic'
  ],
  function(board, BasicHero) {
    'use strict';

    var hero = new BasicHero();
    $('body').append(board);
    hero.position.y = 8;
    hero.render();
  }
);
