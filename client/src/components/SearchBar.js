import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Input, Flex, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";

function SearchBar() {
    const [search, setSearch] = useState("");
    const [isSelected, setIsSelected] = useState("learn"); 
    const history = useHistory();

    function handleInput(e) {
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        console.log("clicked")
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
console.log(search)
console.log(isSelected)
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Flex alignItems="center" justifyContent="center" mt={6} mb={3}>
            <RadioGroup onChange={setIsSelected} value={isSelected}>
                <Stack direction="row">
                    <Radio colorScheme="teal" value="learn">Learner</Radio>
                    <Radio colorScheme="teal" value="teach">Teacher</Radio>
                </Stack>
            </RadioGroup>
                
            </Flex>
            <Flex alignItems="center" justifyContent="center" mb={6}>
                <Input className="search-bar" type="text" placeholder="Find a partner by language" value={search} onChange={handleInput} />
                <Button type='submit' ml={3} colorScheme="teal" >Search</Button>
            </Flex>
        </form>
    </>
  )
}

export default SearchBar