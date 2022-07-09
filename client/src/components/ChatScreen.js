import React, { useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionCableContext } from '../index';



function ChatScreen( {user} ) {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [chat, setChat] = useState([]);
  const cable = useContext(ActionCableContext);
  
  useEffect(() => {
    fetch(`/chatrooms/${id}`)
    .then(res => res.json())
    .then(data => {
      debugger
      console.log(user.id);
      if(user.id!=data["user_id"]){
        data.partner_id=data.user_id
        data.user_id = user.id
      }
      setChat(data)})
  }, [user])

  console.log(chat);

  useEffect(() => {
    if(chat.id && user) {
    const channel = cable.subscriptions.create({
      channel: "MessagesChannel",
      user_id: user.id,
      recipient_id: chat.partner_id
    },
    {
      received: (data) => {

          setMessages([...messages, data]);
          console.log(data)
      }
      
  });
    
    setChannel(channel);


    return () => {
      channel.unsubscribe();
    }

  }}, [id, cable.subscriptions, chat, user]);

  function sendMessages(content) {
    // needs to have sender and receipient Ids
    // const data = { conversation_id: parseInt(id), user_id: user.id, content:content };
    const data = { sender_id: user.id, recipient_id: chat.partner_id, content:content}
    channel.send(data);
    console.log("sent ", data);
  }
  console.log(channel)

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Just submitted ")
    sendMessages(text);
    setText("");
  }

  return (
    <>
      <div>
        <h4>Logged in as {user !== null ? user.name : "guest"}</h4>
      </div>
      <div>
        <ul>
          { messages.length > 0 ?
            messages.map((message) => {
              return <li key={messages.id}>{message.content} sent by {message.user_id}</li>
            }) : null }
        </ul>
      </div>
      <form onSubmit={handleSubmit} >
        <input type="text" name="message" value={text} onChange={e => setText(e.target.value)} />
        <button>Send message</button>
      </form>
    </>
  )
}

export default ChatScreen;