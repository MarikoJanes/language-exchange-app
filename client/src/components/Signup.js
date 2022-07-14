import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Flex, Heading, Input, Button, Grid, GridItem } from "@chakra-ui/react";
import TitlePhotos from './TitlePhotos';

function Signup({ setUser, setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    

    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: username,
            email,
            password,
            password_confirmation: passwordConfirmation,
            city: ""
            // profile_image_url: ""
        }

        fetch("/users", {
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
                    setIsAuthenticated(true);
                    setUser(user);
                    history.push("/settings");
                })
            } else {
                res.json()
                .then(json => setErrors(json.errors))
            }
        })
    }


  return (
    <Grid templateColumns='repeat(8, 1fr)' background="teal.100">
    <GridItem colSpan={5} className="image-container" ml={10}>
        <TitlePhotos />
      
    </GridItem>
    <GridItem colSpan={3}>

    
    <Flex  className="login-form" alignItems="center" justifyContent="center">
        <Flex className="login" direction="column" background="teal.100" p={12} rounded={6}>
            <form onSubmit={handleSubmit}>
                <Heading mb={6}>Sign Up</Heading>

                    <Input 
                        background="white"
                        mb={3}
                        type="text" 
                        name="name" 
                        placeholder='username' 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                        <br></br>

                    <Input 
                        background="white"
                        mb={3}
                        type="email" 
                        name="email" 
                        placeholder="email@example.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                        <br></br>
                    
                    <Input 
                        background="white"
                        mb={3}
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                        <br></br>
                    
                    <Input 
                        background="white"
                        mb={3}
                        type="password" 
                        name="passwordConfirmation" 
                        placeholder="password confirmation" 
                        value={passwordConfirmation} 
                        onChange={e => setPasswordConfirmation(e.target.value)} 
                    />
                        <br></br>

                    {errors ? errors.map((error, index) => {
                        return <p style={{color: "red"}} key={index}>{error}</p>
                    }) : null}    
                    
                    <Button mt={3} mb={6} colorScheme="teal" variant='solid' type="submit" >Sign up</Button>
            </form>
            <p style={{color: "gray"}}>Already a member? <Link to="/login"> Log in</Link></p>
        </Flex>
    </Flex>
    </GridItem>
    </Grid>
  )

}

export default Signup