import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const BlogDetails = (props) =>
{
    const history=useHistory();
    const { id } = useParams();
    const [blog,setBlog] = useState(null);
    const [error,setError] = useState(null);
    const [isPending, setIsPending] =useState(true);
    const [isprivate, setIsprivate] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(()=>
    {
        axios.get(`http://localhost:3001/users/firebase-blog/${id}`).then((res)=>{
            if(res.data.error) throw Error(res.data.error);
            setBlog(res.data);
            setIsprivate(res.data.private);
            setIsPending(false);
            
            axios.post('http://localhost:3001/users/getliked',{blogid:id}).then((res)=>{
                if(res.data.error) throw Error(res.data.error);
                setLikes(res.data.likes);
                if(res.data.liked===1)
                    setLiked(true);
                
            })
            .catch((err)=>{ 
                setError(err.message);
                setIsPending(false);
            });
        
        })
        .catch((err)=>{ 
            setError(err.message);
            setIsPending(false);
        });
    
    }, []);

    
    if(!isPending && blog!=null) {
        document.getElementById('blog-body-fetch').innerHTML = blog.body;
    }

    const handlePublish = ()=>{

        setIsPending(true);
        axios.post('http://localhost:3001/users/update',{ownerid:blog.uid,blogid:id,update:{private:false}}).then((res)=>{
            if(res.data.error) throw Error(res.data.error);
            setIsPending(false);
            setIsprivate(false);
        }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
        });

    };

    const handlePrivate= ()=>{

        setIsPending(true);
        axios.post('http://localhost:3001/users/update',{ownerid:blog.uid,blogid:id,update:{private:true}}).then((res)=>{
            if(res.data.error) throw Error(res.data.error);
            setIsPending(false);
            setIsprivate(true);
        }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
        });
    };

    const handleEdit = ()=>{
        
        history.push('/create',{blog:blog, blogid:id});
    }

    const handleDelete = ()=>{

        axios.post('http://localhost:3001/users/delete', {ownerid:blog.uid,blogid:id}).then((res)=>{
            if(res.data.error) throw Error(res.data.error)
            else{
            history.push('/dashboard');}
        }).catch((err)=>{
            setError(err.message);
        })

    }

    const handleLike = () =>{
        setIsPending(true);
        axios.post('http://localhost:3001/users/like', {blogid:id}).then((res)=>{
            if(res.data.error) throw Error(res.data.error)
            axios.post('http://localhost:3001/users/getliked',{blogid:id}).then((res)=>{
                if(res.data.error) throw Error(res.data.error);
                setLikes(res.data.likes);
                if(res.data.liked===1)
                    setLiked(true);
                setIsPending(false);
                
            })
            .catch((err)=>{ 
                setError(err.message);
                setIsPending(false);
            });

        }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
        })
    }

    const handleUnLike = () =>{
        setIsPending(true);
        axios.post('http://localhost:3001/users/unlike', {blogid:id}).then((res)=>{
            if(res.data.error) throw Error(res.data.error)
            axios.post('http://localhost:3001/users/getliked',{blogid:id}).then((res)=>{
                if(res.data.error) throw Error(res.data.error);
                setLikes(res.data.likes);
                if(res.data.liked===1)
                    setLiked(true);
                else
                    setLiked(false);
                setIsPending(false); 
            })
            .catch((err)=>{ 
                setError(err.message);
                setIsPending(false);
            });
        }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
        })
    }
     
    return(
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blog &&
            <article>
                <h2>{blog.title}</h2>
                <strong> ~ {blog.author}</strong>
                <div  className="blogSpace" id="blog-body-fetch">
                </div>
                
                 
                {props.user.uid === blog.uid && (isprivate ? <button onClick={handlePublish}>Publish!</button> : <button onClick={handlePrivate}>Make Private!</button>)}
                {props.user.uid === blog.uid && <button onClick={handleEdit} style={{
                    marginLeft:"10px"
                }}>Edit</button>}
                {props.user.uid === blog.uid && <button onClick={handleDelete} style={{
                    marginLeft:"10px"
                }}>Delete</button>}<br/>
                <br/>
                {liked ? <button onClick={handleUnLike}>Liked!</button> : <button onClick={handleLike}>Like!</button>}
                <small style={{
                    paddingLeft: "10px"
                }}>{likes} likes</small>
                
            </article>
            }

        </div>
    );
}

export default BlogDetails;