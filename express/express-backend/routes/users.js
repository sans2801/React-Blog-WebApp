var express = require('express');
var router = express.Router();
var firebase = require('firebase');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
var db=firebase.firestore();

router.get('/currentUser', function(req,res,next){

  const user=firebase.auth().currentUser;
  res.json({'user':user});

});


router.post('/express-signup', function(req,res,next){

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

});


router.post('/express-login', (req,res,next)=>{

  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then(()=>{
    const user = firebase.auth().currentUser;
    res.json({'user':user});
  }).catch((err)=>{
    res.json({error:err.message});
  })

});

router.post('/express-logout', (req,res,next)=>{

  if(firebase.auth().currentUser == null)
  {
    res.json({'error':'No user signed in'});
    return;
  }

  firebase.auth().signOut().then((data) => {
      res.json({'logout':data});
  });
});

router.post('/firebase-blog',(req,res,next)=>{

  db.collection('blogs').add(req.body.blog).then((data)=>{    
    res.json({'blogId':data.id});
  })
  .catch((err)=>{
    res.json({err:err.message});
  });
});

router.get('/firebase-blog/:id',(req,res,next)=>{

  db.collection('blogs').doc(req.params.id).get().then((blog)=>{
    if(blog.exists){
      if(blog.data().private && firebase.auth().currentUser.uid!=blog.data().uid) res.json({error:'Blog is private!'})
      else res.json(blog.data());
    }
    else res.json({error:'Blog does not exist'});
  })
  .catch((err)=>{
    res.json({error:err.message});
  });
});

router.post('/update',(req,res,next)=>{

  if(req.body.ownerid!=firebase.auth().currentUser.uid) res.json({error:'Unauthorised access'});
  else{
    db.collection('blogs').doc(req.body.blogid).update(req.body.update).then((data)=>{
      res.send(data);
    }).catch((err)=>{
      res.json({error:err});
    });
  }
})

router.post('/delete', (req,res,next)=>{
  console.log(req.body);
  if(req.body.ownerid!=firebase.auth().currentUser.uid) res.json({error:'Unauthorised access'});
  else{
    db.collection('blogs').doc(req.body.blogid).delete().then(() => {
        db.collection('likes').where('id','==',req.body.blogid).get().then((querySnapshot)=>{
          if(querySnapshot.size==0) res.error({error:"invalid request"});
              querySnapshot.forEach((like)=>{
              like.ref.delete();
    })    
        })
  }).catch((error) => {
      res.json({error:error.message});
  });
  }
});

router.get('/userBlogs',(req,res,next)=>{
  if(firebase.auth().currentUser==null) res.json({'error':'User not found'});
  else{
    const uid=firebase.auth().currentUser.uid;
    db.collection('blogs').where('uid','==',uid).get().then((querySnapshot)=>{
      const blogs=[];
      querySnapshot.forEach((doc)=>{
        blogs.push({blogid:doc.id,blog:doc.data()});
      })
      res.send(blogs);
    }).catch((err)=>{
      res.json({error:err.message});
    });
  }
});

router.post('/getliked', (req,res,next)=>{

  const user=firebase.auth().currentUser;
  db.collection('likes').where('uid','==',user.uid).where('id','==',req.body.blogid).get().then((querySnapshot)=>{
    const liked=querySnapshot.size;
    db.collection('likes').where('id','==',req.body.blogid).get().then((querySnapshot)=>{
      res.json({liked:liked, likes:querySnapshot.size});
    })
    
  }).catch((err)=>{
    res.json({error:'Could not fetch likes'});
  });

});

router.post('/like', (req,res,next)=>{
  const user=firebase.auth().currentUser;
  if(user==null) res.json({error:"User not found"});
  db.collection('likes').where('uid','==',user.uid).where('id','==',req.body.blogid).get().then((querySnapshot)=>{
    if(querySnapshot.size!=0) res.error({error:"Multiple Likes not allowed"});
    db.collection('likes').add({uid:user.uid, id:req.body.blogid}).then(()=>res.send())
    .catch((err)=>{
      res.json({error:err.message});
  })
}).catch((err)=>{
  res.json({error:err.message});
})
});

router.post('/unlike', (req,res,next)=>{

  const user=firebase.auth().currentUser;

  if(user==null) res.json({error:"User not found"});

  db.collection('likes').where('uid','==',user.uid).where('id','==',req.body.blogid).get()
  .then((querySnapshot)=>{
    if(querySnapshot.size==0) res.error({error:"invalid request"});
    querySnapshot.forEach((like)=>{
      like.ref.delete();
    })

    }).then(()=>{
      res.send();
    }).catch((err)=>{
    res.json({error:err.message});
    })
});

router.get('/all', (req,res,next)=>{
  if(firebase.auth().currentUser==null) res.json({error:'user not found'});
  db.collection('blogs').where('private','==',false).get().then((querySnapshot)=>{
    blogs=[];
    querySnapshot.forEach((doc)=>{
      blogs.push({blogid:doc.id,blog:doc.data()});
    })
    res.send(blogs);
  }).catch((error)=>{
    res.json({error:error.message});
  })
});

module.exports = router;
