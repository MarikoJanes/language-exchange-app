import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ChatList from './ChatList';
import SearchBar from './SearchBar';


function Mypage({  }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`/authorized_user`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, []);

  if(userData === null) return <h2>Loading...</h2>
  return (
    <>
      <SearchBar />
      <div>
        <img className="image-goes" src={userData.profile_image_url} alt="profile" />
        <h1>{userData.name}</h1>
        <h1>city: {userData.city}</h1>
        <h1>Studying:</h1>
          <ul>
            {userData.language_to_learns.length > 0 ? 
              userData.language_to_learns.map(lang => {
                return <li key={lang.id}>{lang.name}</li>
              }) : <p>not registered</p>}
          </ul>
        <h1>Teaching:</h1>
          <ul>
            {userData.language_to_teaches.length > 0 ? 
              userData.language_to_teaches.map(lang => {
                return <li key={lang.id}>{lang.name}</li>
              }) : <p>not registered</p>}
          </ul>
        <button><Link to="/settings" >go settings</Link></button>
      </div>
      <ChatList userData={userData} />
    </>
  )
}

export default Mypage