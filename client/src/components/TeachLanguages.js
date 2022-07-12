import React from 'react'
import { Box, Button, HStack, FormLabel, Tag, TagLabel, TagCloseButton, Select } from "@chakra-ui/react";

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
    <>
        <form onSubmit={handleSubmit}>
            <FormLabel fontSize="lg">Languages you can teach: </FormLabel>
                <Select onChange={handleChange}>
                    <option>Choose a language</option>
                        {languages.length > 0 ? languages.map((lang, index) => {
                        return <option key={index} id={lang.id} value={lang.name}>{lang.name}</option> 
                        }) : null}
                </Select>

                <HStack mt={3}>
                    {userData.language_to_teaches.length > 0 ? 
                        userData.language_to_teaches.map(lang => {
                            return (
                                <Box key={lang.id} id={lang.id} className="deleteDiv">
                                    <Tag size="lg" variant="subtle" colorScheme="pink">
                                        <TagLabel>{lang.name}</TagLabel>
                                        <TagCloseButton onClick={handleApiDelete}/>
                                    </Tag>
                                </Box>
                            )
                        }) : null}
                </HStack>
                <HStack mt={3}>
                    {teachLang.length > 0 ? teachLang.map((lang, index) => {
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

export default TeachLanguages