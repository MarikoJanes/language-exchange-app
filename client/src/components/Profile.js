import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import LearnLanguages from './LearnLanguages';
import TeachLanguages from './TeachLanguages';

function Profile({ user, setUser }) {
  const [userData, setUserData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [learnLang, setLearnLang] = useState([]);
  const [teachLang, setTeachLang] = useState([]);
  const [profileImg, setProfileImg] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch(`/authorized_user`)
    .then(res => res.json())
    .then(data => setUserData(data))
  }, []);

  useEffect(() => {
    fetch("/languages")
    .then(res => res.json())
    .then(data => setLanguages(data))
  }, []);

  // add selected languages from API 
  function addLearnLang(data) {
    const temp = {...userData};
    data.forEach(e => {
      temp.language_to_learns.push(e);
    })
    setUserData(temp);
  }

  function addTeachLang(data) {
    const temp = {...userData};
    data.forEach(e => {
      temp.language_to_teaches.push(e);
    })
    setUserData(temp);
  }

  // delete seleced languages from API
  function deleteLearnLang(id) {
    const newId = parseInt(id, 10);
    const newLang = userData.language_to_learns.filter(lang => lang.id !== newId);
    console.log(newLang);
    let temp = {...userData};
    temp.language_to_learns = newLang;
    setUserData(temp);
  }


  function deleteTeachLang(id) {
    const newId = parseInt(id, 10);
    const newLang = userData.language_to_teaches.filter(lang => lang.id !== newId);
    let temp = {...userData};
    temp.language_to_teaches = newLang;
    setUserData(temp);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }

  function uploadFile(e) {
    const URL = window.webkitURL || window.webkitURL;
    console.log(e.target.files[0]);
    setProfileImg(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setUserData({...userData, profile_image_url: url});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    // data.append("name", userData.name);
    // data.append("email", userData.email);
    data.append("city", userData.city);
    
    if(profileImg !== null){
      data.append("profile_image_url", profileImg);
    }
    fetch(`/users/${userData.id}`, {
      method: "PATCH",
      body: data
    })
    .then(res => res.json())
    .then(data => {
      setUser(data);      
    });
  }

  function handleJumpPage() {
    history.push("/mypage");
  }

  if(userData == null || (languages === null || languages.length === 0)) return <h2>Loading...</h2>

  return (
    <>
      <h1>Profile settings</h1>
      <form onSubmit={handleSubmit}>
        <label>profile image:</label>
          <div >
            <img className="image-goes" src={userData.profile_image_url === null ? "../images/placeholder.png" : userData.profile_image_url}
            alt="profile-photo" />
          </div>
          <input type="file" onChange={uploadFile} />
            <br></br>

        <label>username: </label>
        <p>{userData.name}</p>
          <br></br>

        <label>email</label>
        <p>{userData.email}</p>
          <br></br>

        <label>city (optional):</label>
        <input type="text" name="city" value={userData.city} onChange={handleChange} />
          <br></br>

          <input type="submit" value="Save Profile" />
      </form>


        <p>select, show it as a tag in pink</p>
        <LearnLanguages 
            languages={languages} 
            setLearnLang={setLearnLang} 
            learnLang={learnLang} 
            userData={userData} 
            deleteLearnLang={deleteLearnLang} 
            addLearnLang={addLearnLang} 
        />
          <br></br>
   

            
        <p>select, show it as a tag in green</p>
        <TeachLanguages 
            languages={languages} 
            setTeachLang={setTeachLang} 
            teachLang={teachLang} 
            userData={userData} 
            deleteTeachLang={deleteTeachLang} 
            addTeachLang={addTeachLang} 
        />
          <br></br>

      <button onClick={handleJumpPage} >Go back to mypage</button>



    </>
  )
}

export default Profile