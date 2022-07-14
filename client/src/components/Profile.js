import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import LearnLanguages from './LearnLanguages';
import TeachLanguages from './TeachLanguages';
import { Avatar, Box, Text, Button, Grid, VStack, Input, FormLabel, GridItem, HStack } from "@chakra-ui/react";
import { VscAccount, VscBook } from "react-icons/vsc";


function Profile({ user, setUser }) {
  const [userData, setUserData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [learnLang, setLearnLang] = useState([]);
  const [teachLang, setTeachLang] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

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
    <Grid   templateColumns='repeat(5, 1fr)' className="profile-container">
      <GridItem className="profile-bar col-container"  colSpan={1}>
        <VStack mr={4} className="stack">
          <Text mb={30} fontSize="2xl" fontWeight="bold">User Profile</Text>
            <HStack mb={15} className="text">
              <Box>
                <VscAccount />
              </Box>
              <Box className={isClicked ? null : "text-btn"}> 
                <Text  mr={5} onClick={() => setIsClicked(false)}>Profile</Text>
              </Box>
            </HStack>
            <HStack className="text">
              <Box>
                <VscBook />
              </Box>
              <Box className={isClicked ? "text-btn" : null}>
                <Text  mr={3} onClick={() => setIsClicked(true)}>Languages</Text>
              </Box>
            </HStack>
              <Box>
                <Button className="mypage-btn" colorScheme="gray" onClick={handleJumpPage} >My page</Button>
              </Box>
        </VStack>
        
      </GridItem>
      {isClicked === false ? 
        <GridItem colSpan={4}  className="profile-container">
     
     <form onSubmit={handleSubmit}>

           <Avatar boxShadow="lg" mb={10} size='2xl' className="image-goes" src={userData.profile_image_url === null ? "../images/placeholder.png" : userData.profile_image_url}
           alt="profile-photo" />

         <input className="input-nav" type="file" onChange={uploadFile} />
           <br></br>

       <FormLabel mt={6}>Name: </FormLabel>
       <Input mb={6} className="disabled-input search-bar" variant='filled' value={userData.name} disabled/>
         <br></br>

       <FormLabel>Email: </FormLabel>
       <Input mb={6} className="disabled-input search-bar" variant='filled' value={userData.email} disabled/>
         <br></br>

       <FormLabel>City (optional):</FormLabel>
       <Input className="search-bar" mb={10} type="text" name="city" value={userData.city} onChange={handleChange} />
         <br></br>

         <Button colorScheme="teal" type="submit">Save Changes</Button>
       
     </form>
     </GridItem> :
     <GridItem colSpan={4} className="profile-container">
     
        <LearnLanguages 
            languages={languages} 
            setLearnLang={setLearnLang} 
            learnLang={learnLang} 
            userData={userData} 
            deleteLearnLang={deleteLearnLang} 
            addLearnLang={addLearnLang} 
        />
          <br></br>
   

            
        <TeachLanguages 
            languages={languages} 
            setTeachLang={setTeachLang} 
            teachLang={teachLang} 
            userData={userData} 
            deleteTeachLang={deleteTeachLang} 
            addTeachLang={addTeachLang} 
        />
          <br></br>

      
    </GridItem>
      }
      
  
     
        

    </Grid>
 
    </>
  )
}

export default Profile