const firebaseConfig = require('../firebase/config');
const firebase=firebaseConfig.firebase
const db=firebaseConfig.db


module.exports.getLiked = function(req,res,next){

  const user=firebase.auth().currentUser;
  db.collection('likes').where('uid','==',user.uid).where('id','==',req.body.blogid).get().then((querySnapshot)=>{
    const liked=querySnapshot.size;
    db.collection('likes').where('id','==',req.body.blogid).get().then((querySnapshot)=>{
      res.json({liked:liked, likes:querySnapshot.size});
    })
    
  }).catch((err)=>{
    res.json({error:'Could not fetch likes'});
  });

}

module.exports.like = function(req,res,next){
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
}

module.exports.unlike = function(req,res,next){
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
}