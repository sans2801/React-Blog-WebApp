const firebaseConfig = require('../firebase/config');
const firebase=firebaseConfig.firebase
const db=firebaseConfig.db

module.exports.currentUser = function(req,res,next){

    const user=firebase.auth().currentUser;
    res.json({'user':user});
  
}

module.exports.signup = function(req,res,next){

    const username = req.body.username
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
        
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: username,
        photoURL: "https://techpowerusa.com/wp-content/uploads/2017/06/default-user.png"
        }).then(() =>{

        db.collection('users').doc(user.uid).set({
            displayName:user.displayName,
            photoURL:user.photoURL,
            email:user.email
        });

        res.json({'user':user});

        })
    }).catch((err)=>{
        res.json({error:err.message});
    });
}

module.exports.login = function(req,res,next){
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(()=>{
      const user = firebase.auth().currentUser;
      res.json({'user':user});
    }).catch((err)=>{
      res.json({error:err.message});
    })
}


module.exports.logout = function(req,res,next){
    if(firebase.auth().currentUser == null)
    {
      res.json({'error':'No user signed in'});
      return;
    }
  
    firebase.auth().signOut().then((data) => {
        res.json({'logout':data});
    });
}