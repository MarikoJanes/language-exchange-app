import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function SearchBar() {
    const [search, setSearch] = useState("");
    const [isSelected, setIsSelected] = useState("learn"); 
    const history = useHistory();

    function handleInput(e) {
        setSearch(e.target.value);
    }

    function handleChange(e) {
        setIsSelected(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(isSelected === "learn") {
            const searchedLearnLang = search;
            history.push(`/search/learners/${searchedLearnLang}`);
        } else if (isSelected === "teach") {
            console.log("hi", isSelected)
            const searchedTeachLang = search;
            history.push(`/search/teachers/${searchedTeachLang}`);
        }
        
    }

console.log(isSelected)
  return (
    <>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Learner</label>
            <input onChange={handleChange} type="radio" name="language" value="learn" checked={isSelected === "learn"} />
            <label>Teacher</label>
            <input onChange={handleChange} type="radio" name="language" value="teach" checked={isSelected === "teach"}/>
        </div>
            
            <input type="text" placeholder="Find a partner by language" value={search} onChange={handleInput} />
            <button>Search</button>
        </form>
    </>
  )
}

export default SearchBar