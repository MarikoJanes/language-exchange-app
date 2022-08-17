import React from 'react'
import { Link } from "react-router-dom";
import { Grid, GridItem, Flex, Image, Box, Text, Button } from "@chakra-ui/react";



function TitlePage({ user }) {
  return (
    <>
    <Grid background="teal.100" templateColumns='repeat(8, 1fr)'>
     <GridItem colSpan={5}>
     <Box className="title-text">
          <Text mb={6} className="title">Language-Exchange</Text>
          <Text className="title">Meet new friends & learn languages together!</Text>
        </Box>

        {user === null ? 
      <Flex className="titleButton" alignItems="center" justifyContent="center">
        <Button colorScheme="teal" className="page-bottom-1">
          <Link to="/login" >Start Now</Link>
        </Button>
        <Text className="page-bottom-1">OR</Text>
        <Button colorScheme="teal" className="page-bottom-1">
          <Link to="/signup" >Join Now</Link>
        </Button>
      </Flex> 
      : 
      <Flex className="titleButton" alignItems="center" justifyContent="center">
        <Button colorScheme="teal" className="page-bottom-1">
          <Link to="/mypage" >Get Started</Link>
        </Button>
      </Flex>
    }

     </GridItem>
      <GridItem colSpan={3}>
       
        <Flex className="image-container title-container" >
          <Image className="title-image" src="../images/image14.jpg" alt="title" />
        </Flex>
      </GridItem>
      </Grid>
  
      
      
    </>
  )
}

export default TitlePage