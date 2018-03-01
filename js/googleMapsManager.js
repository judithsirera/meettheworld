

var GoogleMaps = {
  apiKey: 'AIzaSyAvbnyxXc2Hmuntiy9BALDvRkYP1Czaxvg',
  center: {lat: -34.397, lng: 150.644},
  zoom: 3,
  map: {},

  init: function () {
    this.initMap();

    var markers = this.getMarkers();
    this.createMarkerClusterer(markers);
  },

  initMap: function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.zoom,
      center: this.center
    });
  },

  getMarkers: function () {
    return locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: (i + 1).toString()
      });
    });
  },

  createMarkerClusterer: function (markers) {
    var markerCluster = new MarkerClusterer(this.map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }
}
