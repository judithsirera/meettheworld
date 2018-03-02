
var data = {};
firebaseManager.init();
instagramManager.userAuthentication();

$( document ).ready(function () {
  instagramManager.addLogoutListener();

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
      $(".noPlaceSelected").css("display", "block");
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
