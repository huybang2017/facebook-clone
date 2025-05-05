import { Avatar, Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import pic from "../../../assets/profpic.jpeg";
import MessageModel from "../../../entities/Message";
import { useNavigate } from "react-router-dom";

interface Props {
  message: MessageModel;
  isSender: boolean;
}

const Messages = ({ message, isSender }: Props) => {
  const chatBottom = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView();
    }
  }, []);
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/profile/${message.sender.userId}`);
  };
  return (
    <>
      {message.message && (
        <Box
          display="flex"
          flexDirection={isSender ? "row-reverse" : "row"}
          alignItems="center"
          mb={2}
          mr="10px"
          ml="10px"
          overflow="visible"
        >
          {!isSender && (
            <Box>
              <Avatar
                src={message.sender.profilePicture || pic}
                size="sm"
                mr="5px"
              />
            </Box>
          )}

          <Box
            bg={
              isSender
                ? "#1877F2"
                : colorMode === "dark"
                ? "#303030"
                : "gray.100"
            }
            color="black"
            p={2}
            borderRadius="20px"
          >
            <Text
              whiteSpace="pre-wrap"
              color={isSender || colorMode === "dark" ? "white" : "black"}
              maxWidth="180px"
            >
              {message.message}
            </Text>

            {/* <Text textAlign="end" fontSize="xs">
          1h
        </Text> */}
          </Box>
        </Box>
      )}
      {message.messageUpdate && (
        <Flex mb="5px" justifyContent="center">
          <Text
            fontSize="xs"
            textTransform="capitalize"
            mr="4px"
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
            onClick={handleNavigateClick}
            fontWeight="semibold"
          >
            {message.sender.firstName} {message.sender.lastName}
          </Text>
          <Text fontSize="xs">{message.messageUpdate}</Text>
        </Flex>
      )}
      <Box ref={chatBottom}></Box>
    </>
  );
};

export default Messages;
