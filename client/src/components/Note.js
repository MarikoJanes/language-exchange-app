import React, { useState, useEffect } from 'react';
import { Autosave, useAutosave } from "react-autosave";

function Note({ note, setContent, content }) {
    
    useAutosave({data: content, onSave: handleSubmit});

console.log(note);
    function handleSubmit(data) {
        fetch(`/notes/${note.id}`, {
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
        <textarea value={content} onChange={e => setContent(e.target.value)} />
    </div>
  )
}

export default Note