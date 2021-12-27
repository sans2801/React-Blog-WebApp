import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const Search = (props) => {
    
  const [blogs,setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
      axios.get('http://localhost:3001/users/all').then((res)=>{
          if(res.data.error) throw Error(res.data.error);
          else
          {
            setIsPending(false);
            setBlogs(res.data);
          }
          }).catch((err)=>{
            setError(err.message);
            setIsPending(false);
          }
        );
  },[])

  return (
    <div className="home">
    
      {isPending && <p>getting results...</p>}
      {error && <p>{error}</p>} 

      { !blogs ? <p>No suitable blogs found</p> :
      
      blogs.map((blog)=>{
        return(
        <div className="linkBlock">
        <Link to={`/blogs/${blog.blogid}`}>
          <p>{blog.blog.title}</p>
          {!blog.blog.author ? <small>By</small> : <small>{blog.blog.author}</small>}
        </Link>
        </div>
        );
      })
    }       
    
    </div>
  );
}
export default Search;