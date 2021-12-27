var firebase = require('firebase');
var firebaseConfig = require('./firebaseConfig.js');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports.db=firebase.firestore();
module.exports.firebase=firebase