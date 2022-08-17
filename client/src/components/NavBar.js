import React from 'react'
import { NavLink, useHistory } from "react-router-dom";
import {Heading, Box, Flex, Text, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function NavBar({isAuthenticated, setIsAuthenticated, setUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(() => {
      setIsAuthenticated(false);
      setUser(null);
      history.push("/");
    })
  }

  function handleLogin() {
    history.push("/login");
  }

  function handleMyPage() {
    history.push("/mypage");
  }

  function handleSignup() {
    history.push("/signup");
  }


  return (
    <>
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.300"
      color="white"
    >
      <Flex align="center" mr={5}>
       
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <NavLink to="/" >
            Language-Exchange 
          </NavLink>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        {/* <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text> */}
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {isAuthenticated ? 
        <Button
          variant="outline"
          _hover={{ bg: "teal.200", borderColor: "teal.200" }}
          mr={5}
          onClick={handleLogout}
        >
          Logout
        </Button> : 
        <Button
          variant="outline"
          _hover={{ bg: "teal.200", borderColor: "teal.200" }}
          mr={5}
          onClick={handleLogin}
        >
          Login
        </Button>}
        {isAuthenticated ? 
        <Button
          variant="outline"
          _hover={{ bg: "teal.200", borderColor: "teal.200" }}
          onClick={handleMyPage}
        >
          My page
        </Button> :
        <Button
          variant="outline"
          _hover={{ bg: "teal.200", borderColor: "teal.200" }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>}
      </Box>
    </Flex>
    </>
  )
}

export default NavBar