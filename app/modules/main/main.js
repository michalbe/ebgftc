/*jshint browser: true*/

GAME.main = function() {
  $('body').append(GAME.board.template);
  GAME.heroContainer = $('.board_container');

  GAME.units = {};
  GAME.units.greens = [];
  var heroClasses = Object.keys(GAME.heroes);
  // hero players

  var defaultHero = GAME.heroes.ConstructionWorker;

  var filledRows = Math.min(GAME.board.rows, Math.ceil(GAME.board.rows/2));
  var filledCols = 2;
  var startY = Math.floor((GAME.board.rows-filledRows)/2);
  var hero;

  var startX = ~~(GAME.board.cols/2) + 1;
  for (var x = startX; x < startX+filledCols; x++) {
    for (var y = startY; y < GAME.board.rows - startY; y++) {
      console.log(x, y);
      hero = new defaultHero();
      hero.init();
      // hero.teleportTo(parseInt(position[0], 10), -5);
      hero.moveTo(x, y);
      GAME.units.greens.push(hero);
    }
  }

  GAME.log.ge('Green units added');

  GAME.units.reds = [];
  startX = ~~(GAME.board.cols/2) - 2;
  for (x = startX; x < startX+filledCols; x++) {
    for (y = startY; y < GAME.board.rows - startY; y++) {
      console.log(x, y);
      hero = new defaultHero();
      hero.orientation = -1;
      hero.init();
      // hero.teleportTo(parseInt(position[0], 10), -5);
      hero.moveTo(x, y);
      GAME.units.reds.push(hero);
    }
  }
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

  $('<button class="button"></button>').html('Skip').appendTo($('body')).on('click', GAME.engine.endState);
  GAME.engine.start();
};

$(GAME.main);
