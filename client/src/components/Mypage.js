import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Avatar, Box, Text, Badge, Flex, Button, Spacer, HStack } from "@chakra-ui/react";
import { FcSettings } from "react-icons/fc";
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
      <Flex mt={12} justifyContent="center" >
        <Avatar className="image-goes" src={userData.profile_image_url} alt="profile" />
        <Box ml={20}>
          <HStack>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">{userData.name}</Text>
            </Box>
            <Box>
              <Button ml={50} leftIcon={<FcSettings />}><Link to="/settings" >Settings</Link></Button>
            </Box>
          </HStack>
        
          
          <Text fontSize="xl">City: {userData.city}</Text>
          <Text fontSize="xl">Learning:</Text>
            <ul>
              {userData.language_to_learns.length > 0 ? 
                userData.language_to_learns.map(lang => {
                  return <Badge ml={1} fontSize="1.0rem" colorScheme="green" key={lang.id}>{lang.name}</Badge>
                }) : <p>not registered</p>}
            </ul>
          <Text fontSize="xl">Teaching:</Text>
            <ul>
              {userData.language_to_teaches.length > 0 ? 
                userData.language_to_teaches.map(lang => {
                  return <Badge ml={1} fontSize="1.0rem" colorScheme="pink" key={lang.id}>{lang.name}</Badge>
                }) : <p>not registered</p>}
            </ul>
    
        </Box>
       
      </Flex>
      <ChatList userData={userData} />
    </>
  )
}

export default Mypage