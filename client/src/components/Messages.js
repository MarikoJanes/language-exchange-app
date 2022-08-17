import React from 'react';
import { Avatar, Flex, HStack, Box, Text  } from '@chakra-ui/react';

function Messages({ message, user, partner } ) {

    
  return (
    <Flex className={message.sender_id === user.id ? "message-box message-container" : "message-box"}>
        <HStack className={message.sender_id === user.id ? "message-container" : null}>
            {message.sender_id !== user.id ? <Avatar size="sm" src={partner.profile_image_url} alt="profile" /> : null}
            <Box className={message.sender_id === user.id ? "sender-message" : "partner-message"}>
                <Text fontWeight="bold">{message.content}</Text>
            </Box>
            {message.sender_id === user.id ? <Avatar size="sm" src={user.profile_image_url} alt="profile" /> : null}
        </HStack>
    </Flex>
  )
}

export default Messages