
var data = {};

$( document ).ready(function () {
  console.log("ready!");

  firebaseManager.init();

});


var card = {
  jqueryClassFormat: ".displayImages",

  createCard: function (post) {
    console.log(post.image);
    var content = '<div class="col s6">' +
                    '<div class="card">' +
                      '<div class="card-image">' +
                        '<img class="materialboxed" width="650" src=' + post.image + '>'
                        '<span class="card-title">' + post.photographer + '</span>' +
                      '</div>' +
                    '</div>' +
                  '</div>';
    return content;
  }
}
