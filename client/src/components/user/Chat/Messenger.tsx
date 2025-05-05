import {
  Box,
  Card,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiLogoMessenger } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatResponse from "../../../entities/Chat";
import useHandleAddToChatArray from "../../../hooks/user/useHandleAddToChatArray";
import { useChatStore } from "../../../store/chat-store";
import { usePostStore } from "../../../store/post-store";
import { useUserStore } from "../../../store/user-store";
import ChatCard from "./ChatCard";
import MessengerChatList from "./MessengerChatList";
import NewMessage from "./NewMessage";

interface Props {
  fetchAllChat?: InfiniteData<ChatResponse>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const Messenger = ({ fetchAllChat, fetchNextPage, hasNextPage }: Props) => {
  const { userId } = useUserStore();
  const { colorMode } = useColorMode();
  const { chatArray, isNewMessageMaximized, setIsNewMessageMaximized } =
    useChatStore();
  const [isHover, setIsHover] = useState<boolean>(false);
  const { handleAddToChatArray } = useHandleAddToChatArray();
  const { isPostImageModalOpen } = usePostStore();

  const fetchChatData =
    fetchAllChat?.pages.reduce(
      (total, page) => total + page.chatModels.length,
      0
    ) || 0;

  const fetchAllChatLength =
    fetchAllChat?.pages.flatMap((page) => page.chatModels).length || 0;

  return (
    <>
      <Flex justifyContent="center">
        <Menu>
          <MenuButton
            as={Box}
            aria-label="chat"
            cursor="pointer"
            height="36px"
            width="36px"
            bg={colorMode === "dark" ? "#303030" : "gray.100"}
            borderRadius="20px"
            _hover={{
              bg: colorMode === "dark" ? "#383838" : "gray.200",
            }}
            display="flex"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center">
              <BiLogoMessenger size="24px" />
            </Box>
          </MenuButton>
          <MenuList border="none">
            <Box ml="10px" mb="5px">
              <Text fontWeight="bold" fontSize="x-large" ml="5px">
                Chats
              </Text>
            </Box>
            {fetchAllChatLength < 1 ? (
              <>
                <Box
                  height="150px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="250px"
                >
                  <Flex flexDirection="column" alignItems="center">
                    <Text mt="10px" fontSize="x-large">
                      No chats yet
                    </Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <>
                <Box
                  maxHeight="400px"
                  overflowY="auto"
                  id="scrollable-chat"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "gray",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#555",
                    },
                  }}
                >
                  <InfiniteScroll
                    dataLength={fetchChatData}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<Spinner />}
                    scrollableTarget="scrollable-chat"
                  >
                    {fetchAllChat?.pages.map((page) =>
                      page.chatModels.map((chat) => (
                        <MenuItem
                          key={chat.chatId}
                          onClick={() => handleAddToChatArray(chat.chatId)}
                        >
                          <MessengerChatList chat={chat} />
                        </MenuItem>
                      ))
                    )}
                  </InfiniteScroll>
                </Box>
              </>
            )}
          </MenuList>
        </Menu>
        {/* <Box
          h="22px"
          w="22px"
          bg="red"
          borderRadius="full"
          position="absolute"
          top="7px"
          right="103px"
        >
          <Text
            textAlign="center"
            color="white"
            fontSize="sm"
            fontWeight="semibold"
          >
            1
          </Text>
        </Box> */}
      </Flex>

      <Box position="fixed" bottom="0" zIndex={100}>
        {chatArray.map((chat) => (
          <ChatCard
            key={chat.chatId}
            chatId={chat.chatId}
            index={chat.index}
            userId={userId ?? 0}
            isMaximized={chat.isMaximized}
          />
        ))}
      </Box>
      {(!isPostImageModalOpen ||
        (isPostImageModalOpen && chatArray.length >= 1)) && (
        <Box position="fixed" bottom="15px" right="20px">
          <IconButton
            aria-label="message"
            icon={<AiOutlineEdit size="25px" />}
            bg={colorMode === "dark" ? "#303030" : "gray.200"}
            _hover={{
              bg: colorMode === "dark" ? "#484848" : "gray.300",
            }}
            isRound
            size="lg"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => setIsNewMessageMaximized(!isNewMessageMaximized)}
          />
        </Box>
      )}

      {isHover && (
        <Card
          position="fixed"
          bottom="20px"
          right="70px"
          padding={2}
          zIndex={150}
        >
          <Text
            textTransform="capitalize"
            isTruncated={true}
            maxWidth="200px"
            fontSize="sm"
            fontWeight="semibold"
          >
            New message
          </Text>
        </Card>
      )}
      {isNewMessageMaximized && (
        <Box position="fixed" bottom="0px" right="85px" zIndex={10}>
          <NewMessage />
        </Box>
      )}
    </>
  );
};

export default Messenger;
