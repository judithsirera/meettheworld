

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
    this.getData();
  },

  getData: function () {
    return firebase.database().ref('users').child('jsirera').once('value').then(function(snapshot) {
      data = snapshot.val();
      $( Object.keys(snapshot.val()) ).each(function (index, value) {
        var coord = snapshot.val()[value].coord;
        var id = value;
        if (snapshot.val()[value].posts && Object.keys(snapshot.val()[value].posts).length > 0) {
            GoogleMapsManager.addMarker({lat: coord.latitude, lng: coord.longitude}, id);
        }
      })
    });
  }
}
