/*jshint browser: true*/


GAME.main = function() {
  $('body').append(GAME.board);

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
    // hero.render();
  });

  // enemy players
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
    getEnemiesHorizontaly: function(position, range, orientation) {
      range = range || 100;
      return _.filter(enemies, function(enemy) {
        return enemy.position.x === position.x && Math.abs(enemy.position.y-position.y) < range;
      }).sort(function(){ return orientation; });
    }
  };
};

$(GAME.main);
