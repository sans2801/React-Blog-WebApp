import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const SignUp = (props)=>{

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [isPending,setIsPending]=useState(false);
    const [error,setError]=useState(null);
    
    const history = useHistory();
    const handleSubmit = (e)=>{

        e.preventDefault();

        if(username==='') {alert('Please enter your username!');return;}
        else if(email==='') {alert('Please enter your E-mail!');return;}
        else if(password==='') {alert('Please enter a Password!');return;}

        setIsPending(true);
        const user={username,email,password};
        axios.post('http://localhost:3001/users/express-signup', user)
        .then((res)=>{

            if(res.data.error)
            {
              throw Error(res.data.error);
            }
            props.onChange(res.data.user);
            setIsPending(false);
            history.push('/dashboard');

        }).catch((err)=>{
          setIsPending(false);
          setError(err.message);
        });
    };

    return(
        <div className="create">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label>E-mail</label>
        <input
          name="email"
          type="email"
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

        {!isPending && <button onClick={handleSubmit}>Create</button>}
        {isPending && <button disabled>Creating Account...</button>}
        {error && <p>{error}</p>}
    </form>
    </div>
    );
}

export default SignUp;