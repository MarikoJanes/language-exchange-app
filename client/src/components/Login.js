import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";

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
    <Flex className="userForm" alignItems="center" justifyContent="center">
      <Flex className="login" direction="column" background="teal.100" p={12} rounded={6}>
        <form onSubmit={handleSubmit}>
          <Heading mb={6} >Login</Heading>
            {/* <label>username</label> */}
            <Input 
                background="white"
                mb={3}
                type="text" 
                name="username" 
                value={username} 
                placeholder="Username" 
                onChange={e => setUsername(e.target.value)}
            />
              <br></br>
            {/* <label>password</label> */}
            <Input 
                background="white"
                mb={6}
                type="password" 
                name="password" 
                value={password} 
                placeholder="Password" 
                onChange={e => setPassword(e.target.value)} 
            />
              <br></br>

            {error ? <div style={{color: "red"}} >{error}</div> : null}

            <Button mt={3} mb={6} colorScheme="teal" variant='solid' type="submit">Login</Button>
        </form>
        <p style={{color: "gray"}}>Not a member? <Link to="/signup"> Join Now</Link></p>
      </Flex>
    </Flex>
  )
}

export default Login