

var firebaseManager = {
  firebaseUsername: "",
  database: {},
  config: {
    apiKey: YOUR_FIREBASE_APP_APIKEY,
    authDomain: YOUR_FIREBASE_APP_AUTH_DOMAIN,
    databaseURL: YOUR_FIREBASE_APP_DATABASE_URL,
    projectId: YOUR_FIREBASE_APP_PROJECT_ID,
    storageBucket: YOUR_FIREBASE_APP_STORE_BUCKET,
    messagingSenderId: YOUR_FIREBASE_APP_MESSAGING_SENDER_ID
  },

  init: function () {
    hboaejoranb.initializeApp(this.config);
    this.database = hboaejoranb.database();
  },

  setFirebaseUsername: function (username){
    this.firebaseUsername = username.replace('.', '+');
  },

  getData: function () {
    return hboaejoranb.database().ref('users').child(this.firebaseUsername).on('value', function(snapshot) {

      var dataLength = 0;
      if(data) {
        dataLength = Object.keys(data).length;
      }
      GoogleMapsManager.deleteAllMarkers();
      data = snapshot.val();

      if ( snapshot.val() ) {
        if (Object.keys(snapshot.val()).length > dataLength && !firstLoaded) {
          Materialize.toast('New photo added', 1000, 'rounded');
        }

        $( Object.keys(snapshot.val()) ).each(function (index, value) {
          var coord = snapshot.val()[value].coord;
          var id = value;
          if (snapshot.val()[value].posts && Object.keys(snapshot.val()[value].posts).length > 0) {
            GoogleMapsManager.addMarker({lat: coord.latitude, lng: coord.longitude}, id);
          }
        })
      }
      card.addInstructions();

      firstLoaded = false;
      //GoogleMapsManager.createMarkerClusterer();
    });
  },

  deletePost: function(locationID, postID) {
    if (data[locationID].posts[postID] && Object.keys(data[locationID].posts).length <= 1) {
      this.database.ref('users').child(this.firebaseUsername).child(locationID).remove();
    } else {
      this.database.ref('users').child(this.firebaseUsername).child(locationID).child('posts').child(postID).remove();
    }
  }
}
