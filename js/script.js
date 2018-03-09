
var data = {};
var firstLoaded = true;

$( document ).ready(function () {
    firebaseManager.init();
    instagramManager.userAuthentication();

  if (window.innerWidth >= 992) {
    var displayImagesHeight = window.innerHeight - $($(".header")[1]).innerHeight();
    $(".displayImages").css("height", displayImagesHeight);
  }

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
                        '<a class="card-open" target="_blank" href="https://www.instagram.com/p/' + postId +'"><i class="material-icons">launch</i></a>' +
                      '</div>' +
                    '</div>' +
                  '</div>';
    return content;
  },

  addInstructions: function () {
    if (data) {
      var l = Object.keys(data).length;
      var p = 0;
      $(Object.keys(data)).each(function (index, value) {
        p += Object.keys(data[value].posts).length;
      })

      $( this.jqueryClassFormat ).html('<h5 class="center noPlaceSelected">This is what you have collected already</h5>' +
      '<p class="center gray-color margin-top-dataRight"><i class="small material-icons">location_on</i></p>' +
      '<p class="center gray-color">' + l + '</p>' +
      '<p class="center gray-color margin-top-dataRight"><i class="small material-icons">camera_alt</i></p>' +
      '<p class="center gray-color">' + p + '</p>')
    } else {
        $( this.jqueryClassFormat ).html('<h5 class="center noPlaceSelected">Are you new?</h5>' +
        '<h4 class="center counter gray-color ">#1</h4>' +
        '<p class="center gray-color ">Download Meet The World chrome extension by clicking <a target="_blank" href="https://chrome.google.com/webstore/detail/meet-the-world/dnjacdhjmipmijabeoocdgaglpbkbkpp">here</a> </p>' +
        '<h4 class="center counter gray-color ">#2</h4>' +
        '<p class="center gray-color ">Go to <a target="_blank" href="https://www.instagram.com">Instagram</a></p>' +
        '<p class="center gray-color ">Start adding your favorite pics to the map by clicking on <img src="img/icon_add.png" width="19" alt=""> </p>' +
        '<h4 class="center counter gray-color ">#3</h4>' +
        '<p class="center gray-color ">Visualize where they have been taken</p>' +
        '<p class="center gray-color ">Click on <img src="img/icon_location.png" width="19" alt=""> to see details and photos</p>');
    }
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
      card.addInstructions();
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
