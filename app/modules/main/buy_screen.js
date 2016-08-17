/*jshint browser: true*/


var BUYSCREEN = (function() {
  var element = document.querySelector('.buy_screen');
  var content = element.querySelector('.content');

  var heroes = Object.keys(HEROES);
  heroes.shift();


  var drawAHero = function() {
    return heroes[~~(Math.random()*heroes.length)];
  };

  var drawHeroes = function() {
    content.innerHTML = '';
    var heroes = [];
    var hero;
    for (var i = 0; i < 3; i++) {
      hero = drawAHero();
      while (heroes.indexOf(hero) > -1) {
        hero = drawAHero();
      }
      createHeroCard(hero);
      heroes.push(hero);
    }

    console.log(heroes);
  };

  var createHeroCard = function(heroClass) {
    var hero = new HEROES[heroClass]();
    var el = document.createElement('div');
    el.className = 'hero_card';
    var img = document.createElement('img');
    img.src = GFX[hero.sprite];

    var info = document.createElement('div');
    info.innerHTML = hero.name + ', cost: <b>' + hero.cost + '</b>';

    el.appendChild(img);
    el.appendChild(info);

    el.onclick = (function(heroClass) {
      return function() {
        element.classList.add('hidden');
        TURNS.addHero(heroClass);
      };
    })(heroClass);
    content.appendChild(el);
  };

  return {
    drawHeroes: drawHeroes,
    show: function() {
      element.classList.remove('hidden');
    }
  };
})();
