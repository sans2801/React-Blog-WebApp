import React from 'react';
import axios from "axios";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import EditorComponent from '../editor/EditorComponent';

const Create = (props) =>{

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [initialBody, setInitialBody] = useState('');
    const [isPending,setIsPending]=useState(false);
    const [error, setError]=useState(null)
    const [check,setCheck]=useState(false);

    const history = useHistory();
    const toUpdate=history.location.state;
    if(toUpdate!=null && !check)
    {   
        setTitle(toUpdate.blog.title);
        setInitialBody(toUpdate.blog.body);
        setCheck(true);
    }

    const handleSubmit = (e)=>{

        e.preventDefault();

        if(title==='') {alert('Please enter a title');return;}
        if(body.getContent()==='') {alert('Please enter contents of the blog');return;}
        const uid=props.user.uid;
        const author = props.user.displayName;
        const article = body.getContent();
        setIsPending(true);
        const blog={title,'body':article,author,uid,private:true,likes:0};
        axios.post(`${process.env.REACT_APP_SERVER_API}/firebase-blog`,{'blog':blog})
        .then((res)=>{
            if(res.data.error)
            {
                throw Error(res.data.error);
            }
            setIsPending(false);
            
            history.push(`/blogs/${res.data.blogId}`);
            //send to other page
        })
        .catch((err)=>{
            setError(err.message);
            setIsPending(false)
        });
    };

    const handleUpdate = (e)=>{
        e.preventDefault();
        if(title==='') {alert('Please enter a title');return;}
        if(body==='') {alert('Please enter contents of the blog');return;}
        setIsPending(true);
        axios.post(`${process.env.REACT_APP_SERVER_API}/update`,{ownerid:toUpdate.blog.uid,'blogid':toUpdate.blogid,update:{title:title, body:body.getContent()}}).then((res)=>{
            if(res.data.error) throw Error(res.data.error);
            setIsPending(false);
            history.push(`/blogs/${toUpdate.blogid}`);

        }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
        });
    };

    return(    
    <div className="create">
    <h2>Create a new blog</h2>
    <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          name="blog-title"
          id="blog-title"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
            />
        <label className='body-label'>Blog Body</label>
        <EditorComponent setBody={setBody} initialBody={initialBody}/>

        {toUpdate==null && !isPending && <button onClick={handleSubmit}>Submit</button>}
        {toUpdate==null && isPending && <button disabled>Adding Blog...</button>}
        {toUpdate==null && error && <p>{error}</p>}

        {toUpdate!=null && !isPending && <button onClick={handleUpdate}>Update</button>}
        {toUpdate!=null && isPending && <button disabled>Updating Blog...</button>}
        {toUpdate!=null && error && <p>{error}</p>}

    </form>
    </div>
    );
}

export default Create;