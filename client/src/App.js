import Navbar from './global/Navbar';
import Home from './pages/Home'; 
import Create from './pages/Create';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import BlogDetails from './pages/BlogDetails';
import { useState } from 'react';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import PageNotFound from './pages/404-page';
function App() {

  const [user,setUser] = useState(null);
  const [gotUser,setGotUser]=useState(false);
  if(!gotUser)
  {
     axios.get(`${process.env.REACT_APP_SERVER_API}/currentUser`).then((res)=>{
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

              <Route exact path = "/signup">
                {user==null ? <SignUp user={user} onChange={handleUser}/> : <Redirect to="/dashboard" user={user}/>}
              </Route>

              <Route exact path="/login">
              {user==null ? <Login user={user} onChange={handleUser}/> : <Redirect to="/dashboard" user={user}/>}
              </Route>

              <Route exact path="/dashboard">
                {user==null? <Login user={user} onChange={handleUser}/> : <Dashboard user={user}/>}
              </Route>

              <Route exact path="/create">
                {user==null ? <Login user={user} onChange={handleUser}/> : <Create user={user} />}
              </Route>

              <Route exact path="/blogs/:id">
                {user==null ? <Login user={user} onChange={handleUser}/> : <BlogDetails user={user}/>}
              </Route>

              <Route exact path="/search">
              {user==null ? <Login user={user} onChange={handleUser}/> : <Search user={user}/>}
              </Route>

              <Route component={PageNotFound} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
