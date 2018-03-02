
var data = {};

$( document ).ready(function () {
  firebaseManager.init();
  instagramManager.userAuthentication();

  var displayImagesHeight = window.innerHeight - $(".header").innerHeight();
  $(".displayImages").css("height", displayImagesHeight);

});


var card = {
  jqueryClassFormat: ".displayImages",
  jqueryDeleteBtnClassFormat: ".card-delete",

  createCard: function (postId, post) {
    var content = '<div class="col s6">' +
                    '<div class="card">' +
                      '<div class="card-image">' +
                        '<img class="materialboxed" width="650" src=' + post.image + '>' +
                        '<span class="card-title">@' + post.photographer + '</span>' +
                        '<span id=' + postId + ' class="card-delete"> <i class="material-icons">delete</i> </span>' +
                      '</div>' +
                    '</div>' +
                  '</div>';
    return content;
  },

  deleteButtonHandler: function (event) {
    var locationID = GoogleMapsManager.markerSelected.getTitle();

    var postID = $($(event.target)[0].parentNode).attr("id");
    var cardDelete = $($(event.target)[0].parentNode)[0];
    var cardImage = $($(cardDelete)[0].parentNode)[0];
    var card_ = $($(cardImage)[0].parentNode)[0];
    var col = $($(card_)[0].parentNode)[0];
    $(col).remove();

    if ($(card.jqueryClassFormat)[0].childElementCount == 0) {
      $( card.jqueryClassFormat ).html('<h5 class="center noPlaceSelected">Are you new?</h5>' +
      '<h4 class="center counter gray-color ">#1</h4>' +
      '<p class="center gray-color ">Download InstaTravel chrome extension by clicking <a href="#">here</a> </p>' +
      '<h4 class="center counter gray-color ">#2</h4>' +
      '<p class="center gray-color ">Go to <a target="_blank" href="www.instagram.com">Instagram</a></p>' +
      '<p class="center gray-color ">Start adding your favorite pics to the map clicking on this icon <img src="img/icon_19.png" width="19" alt=""> </p>' +
      '<h4 class="center counter gray-color ">#3</h4>' +
      '<p class="center gray-color ">Visualize where they have been taken</p>' +
      '<p class="center gray-color ">Click on <img src="img/icon_location.png" width="19" alt=""> to see details and photos</p>');
      GoogleMapsManager.markerInfoWindow.close();
      GoogleMapsManager.deleteSelectedMarker();
    } else {
      var locationData = data[locationID];
      var numOfPosts = $(card.jqueryClassFormat)[0].childElementCount;
      GoogleMapsManager.setMarkerInfoWindowContent(locationData.name, numOfPosts);
    }

    firebaseManager.deletePost(locationID, postID);
  }
}
