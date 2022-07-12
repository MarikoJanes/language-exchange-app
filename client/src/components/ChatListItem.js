import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Avatar, Box, Text, Badge, Flex, Button, Spacer } from "@chakra-ui/react";


function ChatListItem({ conversation, userData }) {
  const [partner, setPartner] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let fetchId;
    if(userData.id == conversation.user_id) {
      fetchId = conversation.partner_id;
    } else if (userData.id !== conversation.user_id) {
      fetchId = conversation.user_id;
    };
    fetch(`/users/${fetchId}`)
    .then(res => res.json())
    .then(data => setPartner(data));
  }, []);

    function handlePageJump() {
        history.push(`/chatrooms/${conversation.id}`);
    }

console.log(partner);
if(partner === null) return <h2>Loading...</h2>
  return (
    <>
    {Object.keys(partner).length > 0 ?
      <Flex my={8} mx={8} boxShadow="md" padding={5}>
      <Avatar size="xl" src={partner.profile_image_url} alt="profile" />
        <Box id={partner.id} ml={6}>
          <Text fontSize="xl" fontWeight="bold">{partner.name}</Text>
          <Text fontSize="xl">
            Learning: 
              {partner.language_to_learns.length > 0 ?
                partner.language_to_learns.map(lang => {
                  return <Badge ml={1} fontSize='0.8em' colorScheme="green" key={lang.id}>{lang.name}</Badge>
                }) : null}
          </Text>
          <Text fontSize="xl">
            Teaching: 
              {partner.language_to_teaches.length > 0 ?
                partner.language_to_teaches.map(lang => {
                  return <Badge ml={1} fontSize='0.8em' colorScheme="pink" key={lang.id}>{lang.name}</Badge>
                }) : null}
          </Text>
          </Box> 

          <Spacer />

          <Box>
            <Button onClick={handlePageJump} colorScheme="teal" className="chat-btn">Chat</Button>
          </Box>
          
        
    </Flex>: "no new messages"
    }
    </>
  )
}

export default ChatListItem