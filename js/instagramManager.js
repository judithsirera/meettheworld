var instagramManager = {
  _TOKEN: 'instatravel_token',
  _USERNAME: 'instatravel_username',

  username: '',
  token: '',


  client_id: '37ef44c599b5494480e90749c720eb7f',
  redirect_uri: 'https://judsirera.github.io/instatravel/login/',
  requestApi: 'https://api.instagram.com/v1/users/self/?access_token=',
  type: "GET",

  requestCurrentUser: function () {
    var xhr = new XMLHttpRequest();

    xhr.open(this.type, this.requestApi + this.token)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        this.username = resp.data.username;
        console.log(this.username);
      }
    }
    xhr.send();
  },

  userAuthentication: function () {
    var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";

    window.location.replace(url);

    
    if (localStorage.getItem(this._TOKEN)) {
      this.username = localStorage.getItem(this._USERNAME);
      this.token = localStorage.getItem(this._TOKEN);
      console.log(localStorage.getItem(this._TOKEN));
    } else {
      var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";

      window.location.replace(url);
    }
    // } else {
    //   var windowURL = window.location.href;
    //   console.log(windowURL);
    //   if (windowURL.split('#').length <= 1) {
    //     var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";
    //     window.location.replace(url);
    //   }else {
    //     this.token = windowURL.split('#')[1];
    //     this.requestCurrentUser();
    //   }
    //}
  }
}
