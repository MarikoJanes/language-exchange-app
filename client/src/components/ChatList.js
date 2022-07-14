import React, { useEffect, useContext, useState } from 'react'
import { Text } from "@chakra-ui/react";

import { ActionCableContext } from '../index';
import ChatListItem from "./ChatListItem";


function ChatList({ userData }) {

    const [conversations, setConversations] = useState(null);
    const cable = useContext(ActionCableContext);

    useEffect(() => {
        fetch("/chatrooms")
        .then(res => res.json())
        .then(data => {
            const userChatData = data.filter(elm => {
                if(elm.user_id === userData.id || elm.partner_id === userData.id) {
                    return true;
                }
            });
            setConversations(userChatData);        
        })
    }, [])





    console.log(conversations)
 
    if(conversations === null) return <h2>Loading...</h2>
  return (
    <div className="list-container">
        <Text className="notification" mt={20} fontSize="xl">Notifications for you: </Text>
        <ul className="chat-card-parent">
            {conversations.length > 0 ? conversations.map(conversation => {
                return <ChatListItem key={conversation.id} conversation={conversation} userData={userData}/>
            }) : 
            <Text fontSize="xl">No updates</Text>}
        </ul>
    </div>
  )
}

export default ChatList