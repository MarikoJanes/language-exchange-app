import React, { useState, useEffect } from 'react';
import { Autosave, useAutosave } from "react-autosave";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Note({ notes, setValue, value }) {
  
    // saveOnUnmount: false}
    // useAutosave({data: value, onSave: handleAutoSubmit});

    useEffect(() => {
           
            console.log("invoked");
          
            fetch(`/notes/${notes.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content : value})
            })
            .then(res => res.json())
            .then(updatedData => console.log("invoked" + updatedData))
            

    }, [value])

    // function handleAutoSubmit(data) {
    //     console.log("invoked");

    //     fetch(`/notes/${notes.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({content : data})
    //     })
    //     .then(res => res.json())
    //     .then(updatedData => console.log("invoked" + updatedData))
    // }

  return (
    <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  )
}

export default Note