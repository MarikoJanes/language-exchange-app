import React, { useEffect, useContext, useState } from 'react'

import { ActionCableContext } from '../index';
import ChatListItem from "./ChatListItem";

// this function is to recieve chat messages 
function ChatList({ userData }) {
    // will be moved up to the parent component
    const [conversations, setConversations] = useState(null);
    const cable = useContext(ActionCableContext);
    let userChatData;
    useEffect(() => {
        fetch("/conversations")
        .then(res => res.json())
        .then(data => {
            userChatData = data.filter(elm => {
                if(elm.messages.find(mess => mess.user_id === userData.id))
                return true;
            });
            setConversations(userChatData); 
            
        })
    }, [])


    console.log(conversations)
 
    if(conversations === null) return <h2>Loading...</h2>
  return (
    <div>
        <ul>
            {conversations.length > 0 ? conversations.map(conversation => {
                return <ChatListItem key={conversation.id} conversation={conversation} />
            }) : null}
        </ul>
    </div>
  )
}

export default ChatList