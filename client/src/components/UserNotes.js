import React, { useState, useEffect } from 'react';
import Note from "./Note";
import { Button, } from "@chakra-ui/react";



function UserNotes({ user, chat }) {
    const [notes, setNotes] = useState({});
    const [value, setValue] = useState("");


    // get an existing note data
    useEffect(() => {
        if(chat !== undefined && Object.keys(chat).length > 0) {
        fetch("/notes")
        .then(res => res.json())
        .then(data => {
          const filteredData = data.filter(d => {
            if(d.chatroom_id === chat.id){
              return true;
            }
          })
          if(filteredData.length>0) {
            setNotes(filteredData[0]);
            setValue(filteredData[0].content);
          } else {
            return console.log("no notes")
          }
          
 
        })}
      },[user, chat])

    // create a new note for those who don't have one already
    function handleClick() {
        fetch("/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: user.id,
            chatroom_id: chat.id,
            content: ""
          })
        })
        .then(res => res.json())
        .then(data => setNotes(data))
      }

    // if(Object.keys(notes).length === 0 ) return <h2>Loading...</h2>
  return (
    <div>
        {(Object.keys(notes).length >0) ?
            <>
            <Note setValue={setValue} value={value} notes={notes} />
            
            

            </>
            : 
            <div>
            <p>Open a note</p>
            <Button onClick={handleClick} className="round-btn" colorScheme="teal">+</Button>
            </div>}
    </div>
  )
}

export default UserNotes