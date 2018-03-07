

var firebaseManager = {
  firebaseUsername: "",
  database: {},
  config: {
    apiKey: "AIzaSyCQKOJcxoH00rBPXxGRoqRiPp6m526AKkU",
    authDomain: "instaplace-c3a25.firebaseapp.com",
    databaseURL: "https://instaplace-c3a25.firebaseio.com",
    projectId: "instaplace-c3a25",
    storageBucket: "instaplace-c3a25.appspot.com",
    messagingSenderId: "49535575943"
  },

  init: function () {
    firebase.initializeApp(this.config);
    this.database = firebase.database();
  },

  setFirebaseUsername: function (username){
    this.firebaseUsername = username.replace('.', '+');
  },

  getData: function () {
    return firebase.database().ref('users').child(this.firebaseUsername).on('value', function(snapshot) {

      var dataLength = 0;
      if(data) {
        dataLength = Object.keys(data).length;
      }
      GoogleMapsManager.deleteAllMarkers();
      data = snapshot.val();

      if ( snapshot.val() ) {
        if (Object.keys(snapshot.val()).length > dataLength && !firstLoaded) {
          Materialize.toast('New photo added', 3000, 'rounded');
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
