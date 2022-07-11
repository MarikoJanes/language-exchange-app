import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import SearchBar from './SearchBar';
import UserCard from './UserCard';


function TeachSearchResult({ user }) {
    const { searchedTerm } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    const temp = searchedTerm.charAt(0).toUpperCase() + searchedTerm.slice(1);

    useEffect(() => {
        fetch(`/search/teachers/${temp}`)
        .then(res => res.json())
        .then(data => setSearchResult(data));
    }, [searchedTerm])

console.log(searchResult)
  return (
    <>
      <SearchBar />
      <div>
          <Text ml={4} fontSize='3xl'>Search results for "{temp}": </Text>
          {searchResult.length > 0 ? 
              searchResult.map((result, index) => {
                  return <UserCard key={index} result={result} user={user} />
              }) : <h2>Users not found</h2>}
      </div>
    </>
  )
}


export default TeachSearchResult