/*jshint browser: true*/


GAME.main = function() {
  $('body').append(GAME.board);

  var units = [];
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
    units.push(hero);
  });

  // enemy heroes
  var enemies = [];
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
    enemies.push(hero);
  });

  GAME.utils = {
    shake: function() {
      $('body').one('animationend', function(){
        $('body').removeClass('shake');
      });

      $('body').addClass('shake');
    },
    getEnemiesHorizontaly: function(hero) {
      var position = hero.position;
      var range = hero.attackRange + 1;
      var orientation = hero.orientation;
      var set = orientation > 0 ? enemies : units;
      range = range || 100;
      return _.filter(set, function(unit) {
        return unit.position.x === position.x && Math.abs(unit.position.y-position.y) < range;
      }).sort(function(){ return orientation; });
    }
  };
};

$(GAME.main);
