import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function SearchBar() {
    const [search, setSearch] = useState("");
    const history = useHistory();

    function handleInput(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const searchedLearnLang = search;
        history.push(`/search/${searchedLearnLang}`);
    }


  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Find a partner by language" value={search} onChange={handleInput} />
            <button>Search</button>
        </form>
    </>
  )
}

export default SearchBar