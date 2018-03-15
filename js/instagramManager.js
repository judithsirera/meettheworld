var instagramManager = {
  _TOKEN: "meettheworld_token",
  _USERNAME: "meettheworld_username",

  username: "",
  token: "",


  client_id: YOUR_INSTAGRAM_CLIENT_ID,
  redirect_uri: 'http://meettheworld.judithsirera.com/login/',
  requestApi: 'https://api.instagram.com/v1/users/self/?access_token=',
  type: "GET",

  requestCurrentUser: function () {
    var xhr = new XMLHttpRequest();

    xhr.open(this.type, this.requestApi + this.token)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {

        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        instagramManager.username = resp.data.username;
        //localStorage.setItem(instagramManager._USERNAME, resp.data.username);
        instagramManager.setUsernameProfileOnHTML();
        firebaseManager.setFirebaseUsername(instagramManager.username);
        firebaseManager.getData();
        localStorage.removeItem(instagramManager._TOKEN);
        $( "#preLogin" ).css("display", "none");
      }

    }
    xhr.send();
  },

  userAuthentication: function () {
    /*if (localStorage.getItem(this._USERNAME)) {
      this.username = localStorage.getItem(this._USERNAME);
      this.token = localStorage.getItem(this._TOKEN);
      this.setUsernameProfileOnHTML();
      firebaseManager.getData();
    } else*/
    if (localStorage.getItem(this._TOKEN)){
      $( "#welcome" ).css("display", "none");
      this.token = localStorage.getItem(this._TOKEN);
      this.requestCurrentUser();
    } else {
      var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";
      window.location.replace(url);
    }

  },

  setUsernameProfileOnHTML: function () {
    $( '.username' ).html(this.username);
  }
}
