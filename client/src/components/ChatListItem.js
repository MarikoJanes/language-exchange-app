import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { ActionCableContext } from "../index";

function ChatListItem({ conversation }) {
    const [messages, setMessages] = useState([]);
    const cable = useContext(ActionCableContext);
    const history = useHistory();

    useEffect(() => {
        cable.subscriptions.create({
            channnel: "MessagesChannel",
            id: conversation.id
        },
        {
            received: (data) => {
                setMessages([...messages, data]);
                console.log(data)
            }
            
        })
    }, [conversation, cable.subscriptions, messages])

    function handlePageJump(e) {
        const pageId = e.target.parentElement.id;
        history.push(`/chatrooms/${pageId}`);
    }

console.log(messages);
  return (
    <div id={conversation.id}>
      {conversation.id}
      <button onClick={handlePageJump} >Chat</button>
    </div>
  )
}

export default ChatListItem