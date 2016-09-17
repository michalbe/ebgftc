/* global firebaseConfig */

var NETWORK = (function() {
  var lobbyRef;

  return {
    start: function() {
      var self = NETWORK;
      firebase.initializeApp(firebaseConfig);

      lobbyRef = firebase.database().ref('lobby');

      firebase.auth().onAuthStateChanged(function(user) {
    		if (user) {
    			// User signed in
    			console.log('Player signed in', user.uid);
    			var playerID = user.uid;
          var gameID = self.getGameID();

          console.log('gid', gameID);
          if (gameID === null) {
            // We are the host
            gameID = self.guid();
            window.location.hash = gameID;
            console.log('elo', gameID);
            lobbyRef.child('games/' + gameID).set({
              green: playerID,
              red: 'null'
            });
            alert('Send URL to friend ' + window.location.href);
          } else {
            // We are joining existing game
            lobbyRef.child('games/' + gameID).update({
              red: playerID
            });
          }
    		} else {
    			// User signed out
    			console.log('Player signed out', GAME.playerID);

    			firebase.auth().signInAnonymously().catch(function(error) {
    				console.log(error.code + ': ' + error.message );
    			});
    		}
    	});
    },
    getGameID: function() {
      console.log('ELO?');
      var hash = window.location.hash.replace('#','');
      if (hash === '') {
        return null;
      } else if (/^[0-9a-fA-F]{16}$/.test(hash)) {
        return hash;
      }

      alert('Not valid game ID!');
    },

    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + s4() + s4();
    }
  };
})();
