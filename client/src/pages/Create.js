import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SimpleExample from '../editor/Editor';

const Create = (props)=> {
  
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPending,setIsPending]=useState(false);
  const [error, setError]=useState(null);
  const history = useHistory();

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(title==='') {alert('Please enter a title');return;}
    if(content==='') {alert('Please enter contents of the blog');return;}
    const uid=props.user.uid;
    const blog={
      title,content,uid,private:true,likes:0
    };

    axios.post('http://localhost:3001/users/firebase-blog',blog).then((res)=>{
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
  }

  return(
    <div>
      <SimpleExample/>
    </div>
  );
}


const Create_temp = (props) =>{

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [isPending,setIsPending]=useState(false);
    const [error, setError]=useState(null)
    const [check,setCheck]=useState(false);

    const history = useHistory();
    const toUpdate=history.location.state;
    if(toUpdate!=null && !check)
    {   
        const newline=new RegExp("<br/>","g");
        const imageOpen=new RegExp("<img class='imgClass' src='","g");
        const imageClose=new RegExp("'/>","g");

        const showBody=toUpdate.blog.body.replace(newline,'\n').replace(imageOpen,"!img<<").replace(imageClose,">>");
        setTitle(toUpdate.blog.title);
        setBody(showBody);
        setCheck(true);
    }

    const handleSubmit = (e)=>{

        e.preventDefault();

        if(title==='') {alert('Please enter a title');return;}
        if(body==='') {alert('Please enter contents of the blog');return;}
        const uid=props.user.uid;
        const author = props.user.displayName;
        setIsPending(true);
        const blog={title,body,author,uid,private:true,likes:0};
        const finalBlog = (JSON.stringify(blog)).replace(/\\n/g,"<br/>").replace(/!img<</g,"<img class='imgClass' src='").replace(/>>/g,"'/>");
        axios.post('http://localhost:3001/users/firebase-blog',{'blog':JSON.parse(finalBlog)})
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
        const finalBlog = (JSON.stringify({title:title, body:body})).replace(/\\n/g,"<br/>").replace(/!img<</g,"<img class='imgClass' src='").replace(/>>/g,"'/>");
        axios.post('http://localhost:3001/users/update',{ownerid:toUpdate.blog.uid,blogid:toUpdate.blogid,update:JSON.parse(finalBlog)}).then((res)=>{
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
    {/* <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          name="blog-title"
          id="blog-title"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
            />
        <label>Blog Body</label>
        <textarea
          name="blog-body"
          id="blog-body"
          required
          value={body}
          rows="40"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        {toUpdate==null && !isPending && <button onClick={handleSubmit}>Submit</button>}
        {toUpdate==null && isPending && <button disabled>Adding Blog...</button>}
        {toUpdate==null && error && <p>{error}</p>}

        {toUpdate!=null && !isPending && <button onClick={handleUpdate}>Update</button>}
        {toUpdate!=null && isPending && <button disabled>Updating Blog...</button>}
        {toUpdate!=null && error && <p>{error}</p>}

    </form> */}

    </div>
    );
}

export default Create;