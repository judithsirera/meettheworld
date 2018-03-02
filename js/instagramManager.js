var instagramManager = {
  username: 'jsirera',

  token: '227452265.37ef44c.6aa376f9648144fe8d6f7caf06a92b90',
  client_id: '37ef44c599b5494480e90749c720eb7f',
  redirect_uri: 'https://github.com/judsirera/instatravel',
  requestApi: 'https://api.instagram.com/v1/users/self/?access_token=',
  requestToken: "",
  type: "GET",

  requestCurrentUser: function () {
    var xhr = new XMLHttpRequest();

    xhr.open(this.type, this.requestApi + this.token)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        this.username = resp.data.username;
      }
    }
    xhr.send();
  },

  userAuthentication: function () {

    var url = "https://api.instagram.com/oauth/authorize/?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&response_type=token";
    window.location.replace(url);

    //TODO url fragment.

  }
}
