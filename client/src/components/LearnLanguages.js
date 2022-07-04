import React from 'react'
import { GoTrashcan } from "react-icons/go";

function LearnLanguages({ languages, setLearnLang, learnLang, userData, addLearnLang, deleteLearnLang }) {

    function handleChange(e) {
        console.log(e.target.value);
        const idx = languages.find(lang => lang.name === e.target.value);
        console.log(idx); //{id: 1, name: 'Arabic'}
        setLearnLang([...learnLang, idx]);

    }

    function handleApiDelete(e) {
        const item = e.target.closest(".deleteDiv"); // <div id="4" class="deleteDiv">...</div>
        fetch(`/language_to_learns/${item.id}`, {
            method: "DELETE"
        })
        deleteLearnLang(item.id);
    }

    function handleDelete(index) {
        const list = [...learnLang];
        list.splice(index, 1);
        setLearnLang(list);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // for(let i = 0; i < learnLang.length; i++) {
        //     fetch("/language_to_learns", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             user_id: userData.id,
        //             language_id: learnLang[i].id
        //         })
        //     })
        //     .then(res => res.json())
        //     .then(data => console.log(data));
        // }
        fetch("/language_to_learns", {
            method: "POST",
            body: JSON.stringify(learnLang) 
        })
        .then(res => res.json())
        .then(data => {
            setLearnLang([]);
            addLearnLang(data)
        });

    }
    //debugger
console.log(userData.language_to_learns)

  return (
    <form onSubmit={handleSubmit}>
         <label>language you want to learn: </label>
            <select onChange={handleChange}>
              <option>Choose a language</option>
              
                {languages.length > 0 ? languages.map((lang, index) => {
                  return <option key={index} id={lang.id} value={lang.name}>{lang.name}</option> 
                }) : null}
            </select>

            <input type="submit" value="Save" />
        {userData.language_to_learns.length > 0 ? 
            userData.language_to_learns.map((lang) => {
                return (
                    <div key={lang.id} id={lang.id} className="deleteDiv">
                    <li>{lang.name !== null ? lang.name : "language"}</li>
                    <button type="button" onClick={handleApiDelete}><GoTrashcan /></button>
                </div>
                )
            }) : null}
        {learnLang.length > 0 ? learnLang.map((lang, index) => {
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

export default LearnLanguages