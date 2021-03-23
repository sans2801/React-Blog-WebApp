import Navbar from './Navbar';
import Home from './Home'; 
import Create from './Create';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
function App() {

  const [user,setUser] = useState(null);
  const [gotUser,setGotUser]=useState(false);
  if(!gotUser)
  {
     axios.get('http://localhost:3001/users/currentUser').then((res)=>{
     setUser(res.data.user);
    });
    setGotUser(true);
  }

  function handleUser(val)
  {
    setUser(val);
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onChange={handleUser}/>
        <div className="content">
          <Switch>

              <Route exact path="/">
                <Home user={user}/>
              </Route>

              <Route path = "/signup">
                {user==null ? <SignUp user={user} onChange={handleUser}/> : <Redirect to="/dashboard" user={user}/>}
              </Route>

              <Route path="/login">
              {user==null ? <Login user={user} onChange={handleUser}/> : <Redirect to="/dashboard" user={user}/>}
              </Route>

              <Route path="/dashboard">
                {user==null? <Login user={user} onChange={handleUser}/> : <Dashboard user={user}/>}
              </Route>

              <Route path="/create">
                {user==null ? <Login user={user} onChange={handleUser}/> : <Create user={user} />}
              </Route>

              <Route exact path="/blogs/:id">
                {user==null ? <Login user={user} onChange={handleUser}/> : <BlogDetails user={user}/>}
              </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
