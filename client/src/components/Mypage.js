import React from 'react';
import { Link } from "react-router-dom";


function Mypage({ user }) {
  console.log(user);
  return (
    <div>
      <img className="image-goes" src={user.profile_image_url} alt="profile" />
      <h1>{user.name}</h1>
      <h1>city: {user.city}</h1>

      <button><Link to="/settings" >go settings</Link></button>
    </div>
  )
}

export default Mypage