import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Avatar, Box, Text, Badge, Flex, Button, Grid, GridItem, VStack } from "@chakra-ui/react";



function ChatListItem({ conversation, userData }) {
  const [partner, setPartner] = useState(null);
  const history = useHistory();
  let timeToRefresh = 0;
  const [messages, setMessages] = useState(conversation.messages);

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


  
  async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

   useEffect(() => {
    sleep(3000)
         .then(() =>{
     if(conversation && userData && partner) {
       console.log("starting use effect!");
         
          timeToRefresh = 10000;
            console.log("Ready to fetch conversation data");
           fetch(`/chatrooms/${conversation.id}`)
           .then(res => res.json())
           .then(data => setMessages(data.messages))
         
         
     }})
     }, [messages, userData.id]);

    function handlePageJump() {
        history.push(`/chatrooms/${conversation.id}`);
    }

  const unreadMessages = messages.filter(mess => {
     return mess.created_at > conversation.last_read_at
  });

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;


if(partner === null) return <h2>Loading...</h2>
  return (
    <>
    {Object.keys(partner).length > 0 ?
      
      <Flex className="chat-card" my={8}  boxShadow="md" padding={5} colSpan={1}>
      <VStack>
      <Avatar className="profile-photo" size="xl" src={partner.profile_image_url} alt="profile" />
      <Text fontSize="xl" fontWeight="bold">{partner.name}</Text>
      </VStack>
      <Grid templateColumns='repeat(4, 1fr)'>
        <GridItem colSpan={1} id={partner.id} ml={6} className="langs">
         
          <Text fontSize="lg">
            Learning: </Text>
              {partner.language_to_learns.length > 0 ?
                partner.language_to_learns.map(lang => {
                  return <Badge ml={1} fontSize='0.8em' colorScheme="green" key={lang.id}>{lang.name}</Badge>
                }) : null}
          
          <Text fontSize="lg">
            Teaching: </Text>
              {partner.language_to_teaches.length > 0 ?
                partner.language_to_teaches.map(lang => {
                  return <Badge ml={1} fontSize='0.8em' colorScheme="pink" key={lang.id}>{lang.name}</Badge>
                }) : null}
          
          </GridItem> 
          <GridItem colSpan={1} className="latest-message">
            <Text>{lastMessage !== undefined ? lastMessage.content : null}</Text>
          </GridItem>
         
          <GridItem colSpan={1}  className={unreadMessages.length > 0 ? "unread" : null}>
              
            <Text>{unreadMessages.length > 0 ? unreadMessages.length : null}</Text>
          </GridItem>
          
          
          <GridItem colSpan={1} className="chat-btn">
            <Button onClick={handlePageJump} colorScheme="teal" >Chat</Button>
          </GridItem>
          
          </Grid>
    </Flex>
   : "no new messages"
    }
    </>
  )
}

export default ChatListItem