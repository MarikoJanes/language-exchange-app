import React, { useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { ActionCableContext } from '../index';
import Note from "./Note";



function ChatScreen( {user} ) {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [channel, setChannel] = useState(null);
  const [chat, setChat] = useState({});
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
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
      channel.last_read_at = Date();
      console.log(channel);

      channel.unsubscribe();
    }

  }}, [id, cable.subscriptions, chat, user, chat.partner_id, setChat]);

  function sendMessages(content) {
    // needs to have sender and receipient Ids
    // const data = { conversation_id: parseInt(id), user_id: user.id, content:content };
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

  useEffect(() => {
    fetch("/notes")
    .then(res => res.json())
    .then(data => {
      const filteredData = data.filter(d => {
        if(d.user_id === user.id){
          return true;
        }
      })
      setNotes(filteredData);
    })
  },[])

  function handleClick() {
    fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        chatroom_id: chat.id
      })
    })
    .then(res => res.json())
    .then(data => setNotes([...notes, data]))
  }

  if(chat.id === null) return <h2>Loading...</h2>

  return (
    <>
    {notes.length > 0 ?
      notes.map((note, index) => <Note key={index} note={note} setContent={setContent} content={content} />)
      : null}
      <button onClick={handleClick}>Add Note +</button>
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
    </>
  )
}

export default ChatScreen;