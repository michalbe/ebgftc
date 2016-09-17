/* global firebaseConfig */

var NETWORK = (function() {
  var fbRef;

  return {
    start: function() {
      firebase.initializeApp(firebaseConfig);

      fbRef = firebase.database().ref('data');

      firebase.auth().onAuthStateChanged(function(user) {
    		if (user) {
    			// User signed in
    			console.log('Player signed in', user.uid);
    			var playerID = user.uid;

    			fbRef.child( 'Players/' + playerID + '/isOnline' ).once('value')
            .then(function(isOnline) {

    				if (isOnline.val() === null || isOnline.val() === false) {
    					GAME();
              GAME.playerID = playerID;
    				} else {
    					alert( 'Hey, only one session at a time buddy!' );
    				}
    			});
    		} else {
    			// User signed out
    			console.log( 'Player signed out', GAME.playerID);

    			firebase.auth().signInAnonymously().catch(function(error) {
    				console.log( error.code + ': ' + error.message );
    			});
    		}
    	});
    }
  };
})();
