const firebaseConfig = require('../firebase/config');
const firebase=firebaseConfig.firebase

module.exports = (req,res,next) => {
    if(firebase.auth().currentUser) next();
    else
    {
        res.json({'error':'Please sign in first'});
        return;
    }
}