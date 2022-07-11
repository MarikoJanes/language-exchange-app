import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserCard from './UserCard';


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
      <div id={partner.id}>
      <h3>{partner.name}</h3>
      <ul>
        learning: 
          {partner.language_to_learns.length > 0 ?
            partner.language_to_learns.map(lang => {
              return <li key={lang.id}>{lang.name}</li>
            }) : null}
      </ul>
      <ul>
        teaching: 
          {partner.language_to_teaches.length > 0 ?
            partner.language_to_teaches.map(lang => {
              return <li key={lang.id}>{lang.name}</li>
            }) : null}
      </ul>
      <button onClick={handlePageJump} >Chat</button>
    </div> : null
    }
    </>
  )
}

export default ChatListItem