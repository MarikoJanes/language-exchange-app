import React, { useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionCableContext } from '../index';
import { Grid, GridItem } from '@chakra-ui/react';
import UserNotes from './UserNotes';



function ChatScreen( {user} ) {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [channel, setChannel] = useState(null);
  const [chat, setChat] = useState({});
  const cable = useContext(ActionCableContext);
  
  useEffect(() => {
    if(user != null){
    fetch(`/chatrooms/${id}`)
    .then(res => res.json())
    .then(data => {
      
      if(user.id !=data["user_id"]){
        data.partner_id=data.user_id
        data.user_id = user.id
      }
      setChat(data)})
  }}, [user, chat.partner_id])


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
      <GridItem colSpan={2}>
        <UserNotes user={user} chat={chat} />
      </GridItem>
      <GridItem colSpan={3}>
      <div>
        <h4>{user !== null ? "Logged in as " + user.name : "loading"}</h4>
      </div>
      <div>
        <ul>
        
          { 
            Object.keys(chat).length > 0  ?
            chat.messages.map((message) => {
              return <li key={message.id}>{message.content} sent by {message.sender_id}</li>
            }) : null }
        </ul>
      </div>
      <form onSubmit={handleSubmit} >
        <input type="text" name="message" value={text} onChange={e => setText(e.target.value)} />
        <button>Send message</button>
      </form>
      </GridItem>
      </Grid>
    </>
  )
}

export default ChatScreen;