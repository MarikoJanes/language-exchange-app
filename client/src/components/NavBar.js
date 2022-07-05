import React from 'react'
import { NavLink, useHistory } from "react-router-dom";

function NavBar({setIsAuthenticated, setUser }) {
  
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(() => {
      setIsAuthenticated(false);
      setUser(null);
      history.push("/");
    })
  }


  return (
    <>
    <div>
      <NavLink to="/signup">Signup</NavLink>
    </div>
    <div>
      <NavLink to="/login">Login</NavLink>
    </div>
    <div>
      <NavLink to="/mypage">Mypage</NavLink>
    </div>
    <div>
      <button onClick={handleLogout} >Logout</button>
    </div>
    </>
  )
}

export default NavBar