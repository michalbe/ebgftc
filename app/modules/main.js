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

    moveRow: function(killedEntity) {
      var orientation = killedEntity.orientation;
      var emptyPosition = killedEntity.position;
      var set = orientation < 0 ? enemies : units;
      // I kind of feel this is not what I wanted to achieve...
      // those should be removed from the original sets (enemies/units);
      set = _.without(set, killedEntity);

      _.each(set, function(unit) {
        if (unit.position.y === emptyPosition.y) {
          unit.moveTo(
            parseInt(unit.position.x, 10) - orientation, unit.position.y);
        }
      });
    },

    getEnemiesHorizontaly: function(hero) {
      var position = hero.position;
      var range = hero.attackRange + 1;
      var orientation = hero.orientation;
      var set = orientation > 0 ? enemies : units;
      range = range || 100;
      return _.filter(set, function(unit) {
        return unit.alive && unit.position.y === position.y && Math.abs(unit.position.x-position.x) < range;
      }).sort(function(){ return orientation; });
    }
  };
};

$(GAME.main);
