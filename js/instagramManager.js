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
        localStorage.setItem(this._USERNAME, this.username);
        console.log(this.username);
      }
    }
    xhr.send();
  },

  userAuthentication: function () {
    if (localStorage.getItem(this._TOKEN)) {
      this.username = localStorage.getItem(this._USERNAME);
      this.token = localStorage.getItem(this._TOKEN);
    } else {
      var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";
      window.location.replace(url);
      this.requestCurrentUser();
    }
  }
}
