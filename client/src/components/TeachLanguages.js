import React from 'react'
import { GoTrashcan } from "react-icons/go";

function TeachLanguages({languages, setTeachLang, teachLang, userData, addTeachLang, deleteTeachLang }) {
    
    function handleChange(e) {
        const idx = languages.find(lang => lang.name === e.target.value);
        setTeachLang([...teachLang, idx]);
    }

    function handleApiDelete(e) {
        const item = e.target.closest(".deleteDiv");
        fetch(`/language_to_teaches/${item.id}`, {
            method: "DELETE"
        })
        deleteTeachLang(item.id);
    }

    function handleDelete(index) {
        const list = [...teachLang];
        list.splice(index, 1)
        setTeachLang(list);
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/language_to_teaches", {
            method: "POST",
            body: JSON.stringify(teachLang)
        })
        .then(res => res.json())
        .then(data => {
            setTeachLang([]);
            addTeachLang(data);
        });
    }


return (
    <form onSubmit={handleSubmit}>
        <label>language you are be able to teach: </label>
            <select onChange={handleChange}>
            <option>Choose a language</option>
                {languages.length > 0 ? languages.map((lang, index) => {
                return <option key={index} id={lang.id} value={lang.name}>{lang.name}</option> 
                }) : null}
            </select>

            <input type="submit" value="Save" />

            {userData.language_to_teaches.length > 0 ? 
                userData.language_to_teaches.map(lang => {
                    return (
                        <div key={lang.id} id={lang.id} className="deleteDiv">
                            <li>{lang.name}</li>
                            <button type="button" onClick={handleApiDelete}><GoTrashcan /></button>
                        </div>
                    )
                }) : null}
        {teachLang.length > 0 ? teachLang.map((lang, index) => {
            return (
                <div key={index}>
                    <li>{lang.name}</li>
                    <button type="button" onClick={handleDelete}><GoTrashcan /></button>
                </div>
            )
        }) : null}
    </form>
)
}

export default TeachLanguages