/*jshint browser: true*/

var GAME = function() {
  $('body').append(BOARD.template);
  GAME.heroContainer = $('.board_container');

  GAME.nohajs = true;
  GAME.units = {};
  GAME.units.greens = [];
  // hero players

  var DefaultHero = HEROES.ConstructionWorker;

  var filledRows = Math.min(BOARD.rows, Math.ceil(BOARD.rows/2));
  var filledCols = 0;//2;
  var startY = Math.floor((BOARD.rows-filledRows)/2);
  var hero;
  var y, x;

  var startX = ~~(BOARD.cols/2) + 1;
  for (x = startX; x < startX+filledCols; x++) {
    for (y = startY; y < BOARD.rows - startY; y++) {
      hero = new DefaultHero();
      hero.init();
      hero.moveTo(x, y);
      GAME.units.greens.push(hero);
    }
  }

  LOG.ge('Green units added');

  GAME.units.reds = [];
  startX = ~~(BOARD.cols/2) - (filledCols);
  for (x = startX; x < startX+filledCols; x++) {
    for (y = startY; y < BOARD.rows - startY; y++) {
      hero = new DefaultHero();
      hero.orientation = -1;
      hero.init();
      hero.moveTo(x, y);
      GAME.units.reds.push(hero);
    }
  }

  // additional heroes for red player
  // hero = new defaultHero();
  // hero.orientation = -1;
  // hero.init();
  // hero.moveTo(startX-1, ~~(BOARD.rows/2));
  // GAME.units.reds.push(hero);
  // hero = new defaultHero();
  // hero.orientation = -1;
  // hero.init();
  // hero.moveTo(startX-2, ~~(BOARD.rows/2));
  // GAME.units.reds.push(hero);
  // LOG.ge('Red units added');

  // debug code
  var button;
  var buttonSize = 50;
  for (var i = 0; i < BOARD.cols; i++) {
    if (i === ~~(BOARD.cols/2)) {
      continue;
    }

    button = $('<div></div>').addClass('button');
    button.css({
      top: BOARD.rows * (buttonSize + 5) + 'px',
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
      top: BOARD.rows * (buttonSize + 10) + 'px',
      left: (buttonSize + 4) * i + 'px'
    })
    .attr({
      'data-dir': 'down',
      'data-col': i
    })
    .html('&darr;');

    $('body').append(button);
  }

  LOG.ge('Column buttons added');

  $('div.button').on('click', function() {
    var player = TURNS.getPlayer();
    var dir = $(this).attr('data-dir') === 'up' ? -1 : 1;
    var column = $(this).attr('data-col');
    if (TURNS.isMovementState() &&
      ((player > 0 && column > ~~(BOARD.cols/2) ||
      (player < 0 && column < ~~(BOARD.cols/2))
    ))) {
      LOG.pa('Column nr ' + column + ' swiped ' + $(this).attr('data-dir'));
      UTILS.swipeColumn(column, dir);
      TURNS.makeMove();
    }
  });

  $('<button class="button"></button>').html('Skip').appendTo($('body')).on('click', TURNS.endState);

  $('td.player, td.enemy').on('click', function(evt) {
    if (
      !document.body.classList.contains('placing_hero') ||
      !GAME.heroToAdd ||
      (GAME.heroToAdd.orientation > 0 && !evt.target.classList.contains('player')) ||
      (GAME.heroToAdd.orientation < 0 && !evt.target.classList.contains('enemy'))
    ) {
      console.log('no placing hero')
      return;
    }
    var coords = evt.target.dataset.cell.split('-');
    console.log(coords);
    GAME.heroToAdd.moveTo(parseInt(coords[0]), parseInt(coords[1]));
    LOG.ge(GAME.heroToAdd.name + ' added!');
    GAME.heroToAdd = null;
    document.body.classList.remove('placing_hero');
    UTILS.fillEmptySpots();
    if (TURNS.getPlayersMoney() > 0 && !GAME.nohajs) {
      BUYSCREEN.show();
    } else {
      TURNS.endState();
    }
  });
  TURNS.start();
};

$(GAME);
