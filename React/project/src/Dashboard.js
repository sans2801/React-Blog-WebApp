import { useEffect, useState } from "react";
import axios from 'axios';
const Dashboard = (props) => {
    
  const [blogs,setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
    
    useEffect(()=>{

      axios.get('http://localhost:3001/users/userBlogs').then((res)=>{
      if(res.data.error) throw Error(res.data.error);
      setBlogs(res.data);
      setIsPending(false);
      console.log(blogs);

    }).catch((err)=>{
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
    );

  },[]);

    return (
      <div className="home">
      
      <h1>Welcome {props.user.displayName}!</h1>

      {isPending ? <p>getting your blogs...</p> :
        
        blogs.map((blog)=>{
          <div>
            <p>{blog.blog.title}</p>
            {!blog.blog.private ? <small>Public</small> : <small>private</small>}
          </div>
        })
      }

      
      {error && <p>{error}</p>}
      
      </div>
    );
  }
   
  export default Dashboard;