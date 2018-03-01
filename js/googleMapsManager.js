

var GoogleMapsManager = {
  apiKey: 'AIzaSyAvbnyxXc2Hmuntiy9BALDvRkYP1Czaxvg',
  center: {lat: 42.3862173, lng: -71.113683},
  zoom: 5,
  map: {},
  markers: [],
  markerInfoWindow: {},
  locationInfoWindow: {},

  init: function () {

    this.initMap();

    // Try HTML5 geolocation.
    this.locationInfoWindow = new google.maps.InfoWindow({map: this.map});
    this.markerInfoWindow = new google.maps.InfoWindow({content: ""});

    this.findUserLocation();

  },

  findUserLocation: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        //GoogleMapsManager.locationInfoWindow.setPosition(pos);
        //GoogleMapsManager.locationInfoWindow.setContent('You are here');
        GoogleMapsManager.map.setCenter(pos);
      }, function() {
        handleLocationError(true, locationInfoWindow, GoogleMapsManager.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, locationInfoWindow, GoogleMapsManager.map.getCenter());
    }
  },

  initMap: function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.zoom,
      center: this.center
    });
  },

  addMarker: function (position, locationID) {
    console.log(locationID);
    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: locationID
    });
    this.markerClickListener(marker);
    this.markers.push(marker);
  },

  createMarkerClusterer: function (markers) {
    var markerCluster = new MarkerClusterer(this.map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  },

  markerClickListener: function (marker) {
    marker.addListener('click', function() {

      var locationData = data[marker.getTitle()];
      var numOfPosts = Object.keys(locationData.posts).length;
      console.log(locationData);

      GoogleMapsManager.markerInfoWindow.setContent('<h3 class="markerTitle">' + locationData.name + '</h3>' +
                                                    '<h5 class="markerCount">' + numOfPosts + ' picture(s) </h5>');
      GoogleMapsManager.markerInfoWindow.open(this.map, marker);
    });
  },

  findUserLocationErrorHandler: function (browserHasGeolocation, pos) {
    this.locationInfoWindow.setPosition(pos);
    this.locationInfoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
  },
}
