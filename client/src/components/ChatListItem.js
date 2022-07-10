import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserCard from './UserCard';


function ChatListItem({ conversation, userData }) {
  const [partner, setPartner] = useState(null);
  const history = useHistory();

  // if(userData.id === conversation.user_id) {
  //   return setPartner(conversation.partner_id);
  // } else if (userData.id !== conversation.user_id) {
  //   return setPartner(conversation.user_id);
  // };

  useEffect(() => {
    let fetchId;
    if(userData.id == conversation.user_id) {
      fetchId = conversation.partner_id;
    } else if (userData.id !== conversation.user_id) {
      fetchId = conversation.user_id;
    };
    fetch(`/users/${fetchId}`)
    .then(res => res.json())
    .then(data => console.log(data));
  }, []);

    function handlePageJump(e) {
        const pageId = e.target.parentElement.id;
        history.push(`/chatrooms/${pageId}`);
    }

console.log(conversation);
  return (
    <div id={conversation.id}>
      {conversation.id}
      <button onClick={handlePageJump} >Chat</button>
    </div>
  )
}

export default ChatListItem