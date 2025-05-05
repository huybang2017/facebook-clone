import {
  Box,
  Divider,
  Flex,
  IconButton,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import useFetchAllUserChats from "../../../hooks/user/useFetchAllUserChats";
import { useChatStore } from "../../../store/chat-store";
import { useUserStore } from "../../../store/user-store";
import ChatList from "./ChatList";

const Contacts = () => {
  const { userId } = useUserStore();
  const { isNewMessageMaximized, setIsNewMessageMaximized } = useChatStore();
  const { colorMode } = useColorMode();
  const { data: fetchAllChat, isLoading } = useFetchAllUserChats({
    userId: userId,
    pageSize: 15,
  });
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box width="300px" mt="5px">
      {isLoading ? (
        array.map((skeleton) => (
          <Skeleton width="300px" height="40px" mt="10px" key={skeleton} />
        ))
      ) : (
        <>
          <Text fontWeight="semibold" ml="10px" fontSize="lg" color="gray.500">
            Contacts
          </Text>
          {fetchAllChat?.pages.map((page) =>
            page.chatModels
              .filter((chat) => chat.chatType === "PRIVATE_CHAT")
              .map((chat) => <ChatList key={chat.chatId} chat={chat} />)
          )}
          <Divider mt="10px" mb="10px" />
          <Text fontWeight="semibold" ml="10px" fontSize="lg" color="gray.500">
            Group chats
          </Text>
          {fetchAllChat?.pages.map((page) =>
            page.chatModels
              .filter((chat) => chat.chatType === "GROUP_CHAT")
              .map((chat) => <ChatList key={chat.chatId} chat={chat} />)
          )}
          <Flex
            alignItems="center"
            padding="10px"
            borderRadius="5px"
            _hover={{
              bg: colorMode === "dark" ? "gray.700" : "gray.200",
            }}
            cursor="pointer"
            userSelect="none"
            onClick={() => setIsNewMessageMaximized(!isNewMessageMaximized)}
          >
            <IconButton
              aria-label="close"
              icon={<FiPlus size="20px" />}
              bg={colorMode === "dark" ? "#303030" : "gray.300"}
              _hover={{
                bg: colorMode === "dark" ? "#303030" : "gray.300",
              }}
              isRound
              size="sm"
            />
            <Text ml="10px" fontWeight="semibold">
              Create group chat
            </Text>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Contacts;
