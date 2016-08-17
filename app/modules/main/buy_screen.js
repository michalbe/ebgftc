/*jshint browser: true*/


var BUYSCREEN = (function() {
  var element = document.querySelector('.buy_screen');
  var content = element.querySelector('.content');
  var money = document.createElement('money');
  var cancel = document.createElement('button');
  cancel.innerHTML = 'Cancel';
  cancel.style.display = 'block';
  
  cancel.addEventListener('click', function() {
    TURNS.endState();
    element.classList.add('hidden');
  });

  var heroes = Object.keys(HEROES);
  heroes.shift();


  var drawAHero = function() {
    return heroes[~~(Math.random()*heroes.length)];
  };

  var drawHeroes = function() {
    content.innerHTML = '';
    content.appendChild(money);
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
    content.appendChild(cancel);
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

    el.onclick = (function(hero, heroClass) {
      return function() {
        if (hero.cost > TURNS.getPlayersMoney()) {
          alert('not enough money...');
          return;
        }

        TURNS.pay(hero.cost);
        element.classList.add('hidden');
        TURNS.addHero(heroClass);
      };
    })(hero, heroClass);
    content.appendChild(el);
  };

  return {
    drawHeroes: drawHeroes,
    show: function() {
      var player = TURNS.getPlayer() > 0 ? 'Green' : 'Red';
      money.innerHTML = player + ' player\'s account: ' + TURNS.getPlayersMoney() + '<br/> Turn NR: ' + TURNS.getTurn() + '<br/>';
      element.classList.remove('hidden');
    }
  };
})();
