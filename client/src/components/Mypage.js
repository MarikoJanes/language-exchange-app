import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Mypage({ user }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`/authorized_user`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, []);

  return (
    <div>
      <img className="image-goes" src={userData.profile_image_url} alt="profile" />
      <h1>{userData.name}</h1>
      <h1>city: {userData.city}</h1>

      <button><Link to="/settings" >go settings</Link></button>
    </div>
  )
}

export default Mypage