import React, { useState, useEffect } from 'react';
import { Autosave, useAutosave } from "react-autosave";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Note({ notes, setValue, value }) {
  
    
    useAutosave({data: value, onSave: handleSubmit, saveOnUnmount: false});


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
    <div>
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
        {/* <Textarea value={content} onChange={e => setContent(e.target.value)} /> */}
    </div>
  )
}

export default Note