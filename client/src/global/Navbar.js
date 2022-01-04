import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import '../styles/Navbar.css';

const Navbar = (props) => {

    const history=useHistory();
    const handleLogout = () =>{
      if(props.user)
      {
        axios.get(`${process.env.REACT_APP_SERVER_API}/express-logout`).then((res)=>{
          props.onChange(null);
          history.push('/');
        })
      }
    };


    return(
        <nav className="navbar">
        <Link to="/"><h1>React Blogs</h1></Link>
        <div className="links">

          {props.user && <Link to="/dashboard">Dashboard</Link>}

          {!props.user && <Link to="/signup" className="navbar-component">Sign Up</Link>}

          {!props.user && <Link to="/login" className="navbar-component">Login</Link>}

          {props.user && <Link to="/search" className="navbar-component"><span>&#x1F50E;</span></Link>}

          {props.user && <Link to="/create" className="navbar-component">New Blog</Link>}

          {props.user && <button onClick={handleLogout} className="navbar-component">Logout</button>}

        </div>
      </nav>
    );
}

export default Navbar;