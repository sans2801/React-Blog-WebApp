var firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyDoPRMrfMloLX7ImerooYvqtFQormnevN0",
    authDomain: "ninja-blogs-5daff.firebaseapp.com",
    databaseURL: "https://ninja-blogs-5daff-default-rtdb.firebaseio.com",
    projectId: "ninja-blogs-5daff",
    storageBucket: "ninja-blogs-5daff.appspot.com",
    messagingSenderId: "894724895825",
    appId: "1:894724895825:web:c8dcc0da416d39e7a27470",
    measurementId: "G-NNW5H7MCWC"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  module.exports.db=firebase.firestore();
  module.exports.firebase=firebase