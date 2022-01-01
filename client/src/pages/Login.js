import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login= (props)=>{

    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [isPending,setIsPending]=useState(false);
    const [error,setError]=useState(null);
    
    const history = useHistory();
    const handleSubmit = (e)=>{

        e.preventDefault();

        if(email==='') {alert('Please enter your E-mail!');return;}
        else if(password==='') {alert('Please enter your Password!');return;}

        setIsPending(true);
        const userAuth={email,password};

        axios.post(`${process.env.REACT_APP_SERVER_API}/express-login`,userAuth).then((res)=>{
            
            if(res.data.error)
                throw Error(res.data.error);
            
            props.onChange(res.data.user);
                setIsPending(false);
                history.push('/dashboard');
        
            
        }).catch((err)=>{
            setIsPending(false);
          setError(err.message);
        });
    }

    return(
        <div className="create">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>

        <label>E-mail</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {!isPending && <button onClick={handleSubmit}>Log In</button>}
        {isPending && <button disabled>Logging In...</button>}
        {error && <p>{error}</p>}
    </form>
    </div>
    );
}

export default Login;