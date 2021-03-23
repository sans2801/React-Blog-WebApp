import axios from "axios";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const BlogDetails = (props) =>
{
    const history=useHistory();
    const { id } = useParams();
    const [blog,setBlog] = useState(null);
    const [error,setError] = useState(null);
    const [isPending, setIsPending] =useState(true);
    const [gotBlog, setGotBlog] = useState(false);
    const [isprivate, setIsprivate] = useState(true);

    if(!gotBlog)
    {
        setGotBlog(true);
        axios.get(`http://localhost:3001/users/firebase-blog/${id}`).then((res)=>{
            if(res.data.error) throw Error(res.data.error);
            console.log(res.data);
            setBlog(res.data);
            setIsprivate(res.data.private);
            setIsPending(false);

        }).catch((err)=>{
            
            setError(err.message);
            setIsPending(false);

        });
    }

    
    if(!isPending && blog!=null) {
        document.getElementById('blog-body-fetch').innerHTML = blog.body;
    }

    const handlePublish = ()=>{

        setIsPending(true);
        axios.post('http://localhost:3001/users/update',{ownerid:blog.uid,blogid:id,update:{private:false}}).then((res)=>{
            if(res.data.error) throw Error(res.data.error);
            setIsPending(false);
            setIsprivate(false);
            console.log(res);
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
            console.log(res);
        }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
        });

    };

    const handleEdit = ()=>{
        
        history.push('/create',{blog:blog, blogid:id});
    }
     
    return(
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blog &&
            <article>
                <h2>{blog.title}</h2>
                <p>{blog.author}</p>
                <div id="blog-body-fetch">
                </div>
                
                 
                {props.user.uid === blog.uid && (isprivate ? <button onClick={handlePublish}>Publish!</button> : <button onClick={handlePrivate}>Make Private!</button>)}
                {props.user.uid === blog.uid && <button onClick={handleEdit}>Edit</button>}
                
                
            </article>
            }

        </div>
    );
}

export default BlogDetails;