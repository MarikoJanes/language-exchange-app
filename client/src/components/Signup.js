import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";

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
            city: "",
            profile_image_url: ""
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
    <>
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
                <label>name</label>
                <input type="text" name="name" placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
                    <br></br>
                <label>email</label>
                <input type="email" name="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <br></br>
                <label>password</label>
                <input type="password" name="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <br></br>
                <label>password confirmation</label>
                <input type="password" name="passwordConfirmation" placeholder="password confirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
                    <br></br>

                {errors ? errors.map((error, index) => {
                    return <p style={{color: "red"}} key={index}>{error}</p>
                }) : null}    
                <button type="submit" >Sign up</button>
        </form>
        <p style={{color: "gray"}}>Already a member? <Link to="/login"> Log in</Link></p>
    </>
  )

}

export default Signup