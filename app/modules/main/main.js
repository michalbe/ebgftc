/*jshint browser: true*/


GAME.main = function() {
  $('body').append(GAME.board.template);
  GAME.heroContainer = $('.board_container');

  GAME.units = {};
  GAME.units.greens = [];
  var heroClasses = Object.keys(GAME.heroes);
  // hero players
  var heroCount = $('td.player');
  _.each(heroCount, function(cell) {
    var heroClass = 'BasicHero';
    while (heroClass === 'BasicHero') {
      heroClass = heroClasses[Math.floor(Math.random() * heroClasses.length)];
    }
    var hero = new GAME.heroes[heroClass]();
    var position = $(cell).attr('data-cell').split('-');
    hero.init();
    hero.moveTo(position[0], position[1]);
    GAME.units.greens.push(hero);
  });

  // enemy heroes
  GAME.units.reds = [];
  heroCount = $('td.enemy');
  _.each(heroCount, function(cell) {
    var heroClass = 'BasicHero';
    while (heroClass === 'BasicHero') {
      heroClass = heroClasses[Math.floor(Math.random() * heroClasses.length)];
    }
    var hero = new GAME.heroes[heroClass]();
    var position = $(cell).attr('data-cell').split('-');
    hero.init();
    hero.orientation = -1;
    hero.moveTo(position[0], position[1]);
    GAME.units.reds.push(hero);
  });

  // debug code
  var button;
  for (var i = 0; i < GAME.board.cols; i++) {
    button = $('<div></div>').addClass('button');
    button.css({
      top: GAME.board.rows * 105 + 'px',
      left: 105 * i + 'px'
    })
    .attr({
      'data-dir': 'up',
      'data-col': i
    })
    .html('&uarr;');

    $('body').append(button);

    button = $('<div></div>').addClass('button');
    button.css({
      top: GAME.board.rows * 110 + 'px',
      left: 105 * i + 'px'
    })
    .attr({
      'data-dir': 'down',
      'data-col': i
    })
    .html('&darr;');

    $('body').append(button);
  }

  $('div.button').on('click', function() {
    var dir = $(this).attr('data-dir') === 'up' ? -1 : 1;
    var column = $(this).attr('data-col');
    GAME.utils.swipeColumn(column, dir);
  });
};

$(GAME.main);
