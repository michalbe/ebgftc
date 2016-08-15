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
    // hero.teleportTo(parseInt(position[0], 10), -5);
    hero.moveTo(parseInt(position[0], 10), parseInt(position[1], 10));
    GAME.units.greens.push(hero);
  });

  GAME.log.ge('Green units added');

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
    // hero.teleportTo(parseInt(position[0], 10), -5);
    hero.moveTo(parseInt(position[0], 10), parseInt(position[1], 10));
    GAME.units.reds.push(hero);
  });

  GAME.log.ge('Red units added');

  // debug code
  var button;
  var buttonSize = 50;
  for (var i = 0; i < GAME.board.cols; i++) {
    if (i === ~~(GAME.board.cols/2)) {
      continue;
    }

    button = $('<div></div>').addClass('button');
    button.css({
      top: GAME.board.rows * (buttonSize + 5) + 'px',
      left: (buttonSize + 4) * i + 'px'
    })
    .attr({
      'data-dir': 'up',
      'data-col': i
    })
    .html('&uarr;');

    $('body').append(button);

    button = $('<div></div>').addClass('button');
    button.css({
      top: GAME.board.rows * (buttonSize + 10) + 'px',
      left: (buttonSize + 4) * i + 'px'
    })
    .attr({
      'data-dir': 'down',
      'data-col': i
    })
    .html('&darr;');

    $('body').append(button);
  }

  GAME.log.ge('Column buttons added');

  $('div.button').on('click', function() {
    var player = GAME.engine.getPlayer();
    var dir = $(this).attr('data-dir') === 'up' ? -1 : 1;
    var column = $(this).attr('data-col');
    if (GAME.engine.isMovementState() &&
      ((player > 0 && column > ~~(GAME.board.cols/2) ||
      (player < 0 && column < ~~(GAME.board.cols/2))
    ))) {
      GAME.log.pa('Column nr ' + column + ' swiped ' + $(this).attr('data-dir'));
      GAME.utils.swipeColumn(column, dir);
      GAME.engine.makeMove();
    }
  });

  GAME.engine.start();
};

$(GAME.main);
