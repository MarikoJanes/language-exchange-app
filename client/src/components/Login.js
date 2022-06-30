import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

function Login({ setUser, setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState([]);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: username,
      password
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(user => {
          setUser(user);
          setIsAuthenticated(true);
          history.push("/mypage");
        })
      } else {
        res.json()
        .then(json => setError(json.error));
      }
    });
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
          <label>username</label>
          <input type="text" name="username" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <br></br>
          <label>password</label>
          <input type="password" name="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <br></br>

          {error ? <div style={{color: "red"}} >{error}</div> : null}

          <button type="submit">Login</button>
      </form>
      <p style={{color: "gray"}}>Not a member? <Link to="/signup"> Join Now</Link></p>
    </>
  )
}

export default Login