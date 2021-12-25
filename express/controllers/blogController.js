const firebaseConfig = require('../firebase/config');
const firebase=firebaseConfig.firebase
const db=firebaseConfig.db


module.exports.addBlog = function(req,res,next){

    db.collection('blogs').add(req.body.blog).then((data)=>{    
      res.json({'blogId':data.id});
    })
    .catch((err)=>{
      res.json({err:err.message});
    });
}

module.exports.getBlog = function(req,res,next){

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
}


module.exports.updateBlog = function(req,res,next){

    if(req.body.ownerid!=firebase.auth().currentUser.uid) res.json({error:'Unauthorised access'});
    else{
      db.collection('blogs').doc(req.body.blogid).update(req.body.update).then((data)=>{
        res.send(data);
      }).catch((err)=>{
        res.json({error:err});
      });
    }
}

module.exports.deleteBlog = function(req,res,next){
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
}

module.exports.getUserBlogs = function(req,res,next){
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
}

module.exports.getAllBlogs = function(req,res,next){
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
}