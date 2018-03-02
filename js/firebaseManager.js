

var firebaseManager = {
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

  getData: function () {
    return firebase.database().ref('users').child(instagramManager.username).once('value').then(function(snapshot) {
      data = snapshot.val();
      $( Object.keys(snapshot.val()) ).each(function (index, value) {
        var coord = snapshot.val()[value].coord;
        var id = value;
        if (snapshot.val()[value].posts && Object.keys(snapshot.val()[value].posts).length > 0) {
            GoogleMapsManager.addMarker({lat: coord.latitude, lng: coord.longitude}, id);
        }
      })
      //GoogleMapsManager.createMarkerClusterer();
    });
  },

  deletePost: function(locationID, postID) {
    if (data[locationID].posts[postID] && Object.keys(data[locationID].posts).length <= 1) {
      this.databaseRef.ref('users').child(username).child(locationID).remove();
    } else {
      this.databaseRef.ref('users').child(username).child(locationID).child('posts').child(postID).remove();
    }
  }
}
