import React, { useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionCableContext } from '../index';
import { Grid, GridItem, Button, Input, Box, Flex, Text, Avatar  } from '@chakra-ui/react';
import UserNotes from './UserNotes';
import Messages from './Messages';



function ChatScreen( {user} ) {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [channel, setChannel] = useState(null);
  const [chat, setChat] = useState({});
  const [partner, setPartner] = useState([]);
  const cable = useContext(ActionCableContext);
  
  // get a chat data
  useEffect(() => {
    if(user !== null){
    fetch(`/chatrooms/${id}`)
    .then(res => res.json())
    .then(data => {
      
      if(user.id !=data["user_id"]){
        data.partner_id=data.user_id
        data.user_id = user.id
      }
      setChat(data)})
  }}, [user, chat.partner_id])

  // get a partner data 
  useEffect(() => {
    if(user !== null && chat.id !== null) {
      let fetchId;
      if(user.id === chat.user_id) {
        fetchId = chat.partner_id;
      } else if (user.id !== chat.user_id) {
        fetchId = chat.user_id;
      }
      console.log(fetchId);
      fetch(`/users/${fetchId}`)
      .then(res => res.json())
      .then(data => setPartner(data));
    }
  }, [user, chat])

  console.log(partner);

  // interact with action cable
  useEffect(() => {
    if(chat.id && user) {
    const channel = cable.subscriptions.create({
      channel: "MessagesChannel",
      user_id: user.id,
      recipient_id: chat.partner_id,
      last_read_at: null
    },
    {
      received: (data) => {

          const tmp = {...chat};
          tmp.messages.push(data)
          setChat(tmp);
      }
      
  });
    
    setChannel(channel);


    return () => {
      // not working, needs to be fixed
      channel.last_read_at = Date();
      console.log(channel);

      channel.unsubscribe();
    }

  }}, [id, cable.subscriptions, chat, user, chat.partner_id, setChat]);

  function sendMessages(content) {
    const data = { sender_id: user.id, recipient_id: chat.partner_id, content:content, chatroom: parseInt(id)}
    channel.send(data);
    console.log("sent ", data);
    const tmp = {...chat};
    tmp.messages.push(data)
    setChat(tmp);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Just submitted ")
    sendMessages(text);
    setText("");
  }


  console.log(chat);

  if(chat.id === null) return <h2>Loading...</h2>

  return (
    <>
    <Grid templateColumns='repeat(5, 1fr)' gap={10}>

      {/* notes  */}
      <GridItem colSpan={2}>
        <UserNotes user={user} chat={chat} />
      </GridItem>

      {/* chats */}
      <GridItem colSpan={3} className="chat-box">
      <Flex className="name-box">
       
          <Avatar size="md" src={partner.profile_image_url} alt="profile" />
          <Box ml={3} className="chat-name">
            <Text fontWeight="bold" fontSize="lg">{partner.name}</Text>
          </Box>
        
        
       
      </Flex>
      <div>
        <ul>
        
          { 
            Object.keys(chat).length > 0  ?
            chat.messages.map((message) => {
              return <Messages key={message.id} message={message} user={user} partner={partner} />
            }) : null }
        </ul>
      </div>
      <form onSubmit={handleSubmit} >
        <Input type="text" name="message" value={text} onChange={e => setText(e.target.value)} />
        <Button colorScheme="teal">Send message</Button>
      </form>
      </GridItem>
      </Grid>
    </>
  )
}

export default ChatScreen;