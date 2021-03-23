import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

const Navbar = (props) => {

    const history=useHistory();
    const handleLogout = () =>{
      if(props.user)
      {
        axios.post('http://localhost:3001/users/express-logout').then((res)=>{
          props.onChange(null);
          history.push('/');
        })
      }
    };


    return(
        <nav className="navbar">
        <Link to="/"><h1>Ninja Blogs</h1></Link>
        <div className="links">

        {props.user && <Link to="/dashboard">Dashboard</Link>}

          {!props.user && <Link to="/signup" style={{
            color : "white",
            backgroundColor : "#f1356d",
            borderRadius : "8px"
          }}>Sign Up</Link>}

          {!props.user && <Link to="/login" style={{
            color : "white",
            backgroundColor : "#f1356d",
            borderRadius : "8px"
          }}>Login</Link>}

          {props.user && <Link to="/create" style={{
            color : "white",
            backgroundColor : "#f1356d",
            borderRadius : "8px"
          }}>New Blog</Link>}

          {props.user && <button onClick={handleLogout} style={{
            color : "white",
            backgroundColor : "#f1356d",
            borderRadius : "8px"
          }}>Logout</button>}

        </div>
      </nav>
    );
}

export default Navbar;