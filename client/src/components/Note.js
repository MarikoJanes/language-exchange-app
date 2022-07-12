import React, { useState, useEffect } from 'react';
import { Autosave, useAutosave } from "react-autosave";
import { Textarea } from "@chakra-ui/react";

function Note({ notes, setContent, content, setNotes }) {
    
    useAutosave({data: content, onSave: handleSubmit, saveOnUnmount: false});

console.log(notes);

    function handleSubmit(data) {
        fetch(`/notes/${notes.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content : data})
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }




  return (
    <div >
        <Textarea value={content} onChange={e => setContent(e.target.value)} />
    </div>
  )
}

export default Note