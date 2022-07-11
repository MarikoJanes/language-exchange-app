import React from 'react';
import { useHistory } from "react-router-dom";
import { Avatar, Box, Text, Badge, Flex, Button, Spacer } from "@chakra-ui/react";


function UserCard({ result, user }) {
  const history = useHistory();


  function handleClick(e) {
    const partnerId = parseInt(e.target.parentElement.id);
    // const userIds = [user.id, partnerId];

    fetch("/chatrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        partner_id: partnerId
      })
    })
    .then( res => res.json())
    .then( data => {
      console.log(data);
      history.push(`/chatrooms/${data.id}`);
    })
  }

  return (
    <Flex id={result.id} my={8} mx={8} boxShadow="md" padding={5}>
      
      <Avatar size='2xl' src={result.profile_image_url} alt="profile" />
        <Box ml={3}>
          <Text fontSize="2xl" fontWeight="bold">{result.name}</Text>
          <Text fontSize="xl">City: {result.city}</Text>
          <Text fontSize="xl">Learning: 
              {result.language_to_learns.length > 0 ?
                  result.language_to_learns.map(lang => {
                      return <Badge ml={1} fontSize='0.8em' colorScheme="green" key={lang.language_id}>{lang.name}</Badge>
                  }) : null}
          </Text>
          <Text fontSize="xl">Teaching:
              {result.language_to_teaches.length > 0 ?
                  result.language_to_teaches.map(lang => {
                      return <Badge ml={1} fontSize='0.8em' colorScheme="pink" key={lang.language_id}>{lang.name}</Badge>
                  }) : null}
          </Text>
        </Box>
              
          <Spacer />

        <Box>
          {result.id !== user.id ? 
            <Button className="chat-btn" onClick={handleClick} colorScheme="teal">Start a Chat</Button> : null}
          </Box>
        
         
    </Flex>
    
  )
}

export default UserCard