import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const Dashboard = (props) => {
    
  const [blogs,setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
    
    useEffect(()=>{

      axios.get('http://localhost:3001/users/userBlogs').then((res)=>{
      if(res.data.error) throw Error(res.data.error);
      else
      {
        setIsPending(false);
        setBlogs(res.data);
      }
      }).catch((err)=>{
        console.log(err);
        setError(err.message);
        setIsPending(false);
      }
    );

  },[]);

  return (
    <div className="home">

    <img alt="User Profile Pic" className="profilePic" src={props.user.photoURL}/>
    <h1>Welcome {props.user.displayName}!</h1>

      {isPending && <p>getting your blogs...</p>} 

      { !blogs ? <p></p> :
      
      blogs.map((blog)=>{
        return(
        <div className="linkBlock">
        <Link to={`/blogs/${blog.blogid}`}>
          <p>{blog.blog.title}</p>
          {!blog.blog.private ? <small>Public</small> : <small>private</small>}
        </Link>
        </div>
        );
      })
    }       
    {error && <p>{error}</p>}
    </div>
  );
}
export default Dashboard;