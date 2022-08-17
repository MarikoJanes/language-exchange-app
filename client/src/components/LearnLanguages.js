import React from 'react'
import { Box, Button, HStack, FormLabel, Tag, TagLabel, TagCloseButton, Select } from "@chakra-ui/react";

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


  return (
    <>
        <form onSubmit={handleSubmit}>
            <FormLabel fontSize="lg">Languages you are learning: </FormLabel>
                <Select onChange={handleChange}>
                    <option>Choose a language</option>
                    
                        {languages.length > 0 ? languages.map((lang, index) => {
                        return <option key={index} id={lang.id} value={lang.name}>{lang.name}</option> 
                        }) : null}
                </Select>

                <HStack mt={3}>
                    {userData.language_to_learns.length > 0 ? 
                        userData.language_to_learns.map((lang) => {
                            return (
                                <Box key={lang.id} id={lang.id} className="deleteDiv">
                                    <Tag size="lg" variant="subtle" colorScheme="teal">
                                        <TagLabel>{lang.name}</TagLabel>
                                        <TagCloseButton onClick={handleApiDelete}/>
                                    </Tag>
                                </Box>
                            )
                        }) : null}
                </HStack>
                <HStack mt={3}>
                    {learnLang.length > 0 ? learnLang.map((lang, index) => {
                        return (
                            <Box key={index}>
                                <Tag size="lg" variant="subtle" colorScheme="gray">
                                    <TagLabel>{lang.name}</TagLabel>
                                    <TagCloseButton onClick={handleDelete}/>
                                </Tag>
                            </Box>
                            )
                    }) : null}
                </HStack>
            <Button className="lang-btn" type="submit" colorScheme="teal">Update</Button>
        </form>
    </>
  )
}

export default LearnLanguages