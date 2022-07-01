import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Profile({ user, setUser }) {
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState("../images/placeholder.png")

  const history = useHistory();

  useEffect(() => {
    fetch(`/authorized_user`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }

  function uploadFile(e) {
    const URL = window.webkitURL || window.webkitURL;
    const url = URL.createObjectURL(e.target.files[0]);
    
    console.log(url);
    setProfileImage(url);
    setUserData({...userData, profile_image_url: url});
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/users/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);
      history.push("/mypage");
    });
  }

  if(user === null) return <h2>Loading...</h2>

  return (
    <>
      <h1>Profile settings</h1>
      <form onSubmit={handleSubmit}>
        <label>username: </label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} />
          <br></br>

        <label>email</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
          <br></br>

        <label>language you want to learn: </label>
        <p>select, show it as a tag in pink</p>
          <br></br>

        <label>language you can teach</label>
        <p>select, show it as a tag in green</p>
          <br></br>

        <label>city (optional):</label>
        <input type="text" name="city" value={userData.city} onChange={handleChange} />
          <br></br>
        <label>profile image:</label>
        <div >
          <img className="image-goes" src={profileImage} alt="profile-photo" />
        </div>
        <input type="file" onChange={uploadFile} />
          <br></br>

        <button type="submit">submit profile</button>

      </form>
    </>
  )
}

export default Profile