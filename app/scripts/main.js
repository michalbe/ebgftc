/*jshint browser: true*/

require(
  [
    './board/board',
    './heroes/all'
  ],
  function(board, heroes) {
    'use strict';

    // var heroes = [];
    $('body').append(board);

    var heroClasses = Object.keys(heroes);
    // hero players
    var heroCount = $('td.player');
    _.each(heroCount, function(cell) {
      var heroClass = heroClasses[Math.floor(Math.random()*heroClasses.length)];
      console.log(heroClass);
      var hero = new heroes[heroClass]();
      var position = $(cell).attr('data-cell').split('-');
      hero.init();
      hero.moveTo(position[0], position[1]);
      // hero.render();
    });

    // enemy players
    heroCount = $('td.enemy');
    _.each(heroCount, function(cell) {
      var heroClass = heroClasses[Math.floor(Math.random()*heroClasses.length)];
      var hero = new heroes[heroClass]();
      var position = $(cell).attr('data-cell').split('-');
      hero.init();
      hero.orientation = -1;
      hero.moveTo(position[0], position[1]);
      // hero.render();
    });
  }
);
