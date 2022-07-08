import React from 'react';
import { useHistory } from "react-router-dom";

function UserCard({ result, user }) {
  const history = useHistory();


  function handleClick(e) {
    // const partnerId = parseInt(e.target.parentElement.id);
    // const userIds = [user.id, partnerId];

    fetch("/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      
    })
    .then( res => res.json())
    .then( data => {
      console.log(data);
      history.push(`/chatrooms/${data.id}`);
    })
  }
  return (
    <div id={result.id}>
        <img className='image-goes' src={result.profile_image_url} alt="profile" />
        <h1>{result.name}</h1>
        <p>city: {result.city}</p>
        <p>learning:</p>
        {result.language_to_learns.length > 0 ?
            result.language_to_learns.map(lang => {
                return <li key={lang.language_id}>{lang.name}</li>
            }) : null}
        <p>teaching:</p>
        {result.language_to_teaches.length > 0 ?
            result.language_to_teaches.map(lang => {
                return <li key={lang.language_id}>{lang.name}</li>
            }) : null}
        <button onClick={handleClick} >Start a conversation</button>
    </div>
  )
}

export default UserCard