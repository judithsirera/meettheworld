

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
      $( Object.keys(snapshot.val()) ).each(function (index, value) {
        var coord = snapshot.val()[value].coord;
        var name = snapshot.val()[value].name;

        GoogleMapsManager.addMarker({lat: coord.latitude, lng: coord.longitude}, name);
      })
    });
  }
}
