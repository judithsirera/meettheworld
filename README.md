![picture alt](screenshots/mosaics_long.png "Cover")

**Meet The World** is an app for saving the location of your favorite Instagram pictures. Then, they are displayed on a map, allowing the user to navigate through them. Save your spots with the google chrome extension [(docs)](https://github.com/judsirera/meettheworld_ChromeExtension) and visualize it them on the website [(docs)](https://github.com/judsirera/meettheworld).

## Requirements
- [x] Instagram account
- [x] Meet The World Chrome extension installed

# Firebase Configuration
Before starting you need to link this app to your firebase app. It has to be the same firebase app than Meet The World Chrome Extension [docs](https://github.com/judsirera/meettheworld_ChromeExtension). For that, you just need to write you firebase app configuration parameters where the following code in [firebaseManajer.js](js/firebaseManajer.js):

```javascript
  config: {
    apiKey: YOUR_FIREBASE_APP_APIKEY,
    authDomain: YOUR_FIREBASE_APP_AUTH_DOMAIN,
    databaseURL: YOUR_FIREBASE_APP_DATABASE_URL,
    projectId: YOUR_FIREBASE_APP_PROJECT_ID,
    storageBucket: YOUR_FIREBASE_APP_STORE_BUCKET,
    messagingSenderId: YOUR_FIREBASE_APP_MESSAGING_SENDER_ID
  }
```

These parameters are given by firebase when you [create a project in their console](https://console.firebase.google.com/)

# Start

1. Go [here](https://chrome.google.com/webstore/detail/meet-the-world/dnjacdhjmipmijabeoocdgaglpbkbkpp) and install **Meet The World** Chrome extension

2. Log in to [Instagram website](https://www.instagram.com/)

3. Start adding your pictures by clicking the **add** button. Remove that place from your collection by clicking the **delete** button. *Only the posts with location will have the option to be saved*.
    * Add
![picture alt](screenshots/add_button.png "Add button")

    * Delete
![picture alt](screenshots/delete_button.png "Delete button")

4. Click on the Meet The World nav bar icon ![picture alt](screenshots/icon.png "Meet The World") or go to its website by clicking [here](https://judsirera.github.io/meettheworld/)

5. If you haven't logged in to Instagram, the website will ask you to log in. After that, your locations will be displayed ![picture alt](screenshots/meettheworld.png "Meet The World") Click on any of them for seeing the pictures ![picture alt](screenshots/meettheworld_location.png "Meet The World").


*This chrome extension only works for computer browsers*
