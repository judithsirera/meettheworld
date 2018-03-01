

var GoogleMapsManager = {
  apiKey: 'AIzaSyAvbnyxXc2Hmuntiy9BALDvRkYP1Czaxvg',
  center: {lat: -34.397, lng: 150.644},
  zoom: 3,
  map: {},
  markers: [],
  infoWindow: {},

  init: function () {

    this.initMap();

    // Try HTML5 geolocation.
    this.infoWindow = new google.maps.InfoWindow({map: this.map});

    this.findUserLocation();

  },

  findUserLocation: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        GoogleMapsManager.infoWindow.setPosition(pos);
        GoogleMapsManager.infoWindow.setContent('You are here');
        GoogleMapsManager.map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, GoogleMapsManager.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, GoogleMapsManager.map.getCenter());
    }
  },

  findUserLocationErrorHandler: function (browserHasGeolocation, pos) {
    this.infoWindow.setPosition(pos);
    this.infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
  },

  initMap: function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.zoom,
      center: this.center
    });
  },

  addMarker: function (position, location) {
    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: location
    });

    this.markers.push(marker);
  },

  createMarkerClusterer: function (markers) {
    var markerCluster = new MarkerClusterer(this.map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }
}
