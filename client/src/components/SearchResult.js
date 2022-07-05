import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function SearchResult() {
    const { searchedTerm } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    const temp = searchedTerm.charAt(0).toUpperCase() + searchedTerm.slice(1);
    useEffect(() => {
        fetch(`/search/${temp}`)
        .then(res => res.json())
        .then(data => setSearchResult(data));
    }, [searchedTerm])

console.log(searchResult)
  return (
    <div>
        <h2>Search results for "{temp}": </h2>
    </div>
  )
}

export default SearchResult