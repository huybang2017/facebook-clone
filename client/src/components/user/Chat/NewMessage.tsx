import {
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Input,
  Spacer,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import useCreateGroupChat, {
  CreateGroupChatProps,
} from "../../../hooks/user/useCreateGroupChat";
import useHandleAddToChatArray from "../../../hooks/user/useHandleAddToChatArray";
import useHandleSelectUserClick from "../../../hooks/user/useHandleSelectUserClick";
import useSearchUser from "../../../hooks/user/useSearchUser";
import { useChatStore } from "../../../store/chat-store";
import { useUserStore } from "../../../store/user-store";
import UserSuggestion from "../Navbar/UserSuggestion";

const NewMessage = () => {
  const { userId: currentUserId } = useUserStore();
  const focusRef = useRef<HTMLInputElement>(null);
  const { colorMode } = useColorMode();
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { handleAddToChatArray } = useHandleAddToChatArray();
  const { setIsNewMessageMaximized, isNewMessageMaximized } = useChatStore();
  const { handleSelectUserClick, selectedUser, setSelectedUser } =
    useHandleSelectUserClick();
  const {
    data: searchUser,
    fetchNextPage,
    hasNextPage,
  } = useSearchUser({
    keyword: keyword,
    pageSize: 10,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
    setShowSuggestions(true);
  };

  const searchUserData =
    searchUser?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const [loading, setIsLoading] = useState<boolean>(false);
  const { mutate: createGroupChat } = useCreateGroupChat();
  const { register, handleSubmit, reset, setValue } =
    useForm<CreateGroupChatProps>();
  const [message, setMessage] = useState<string>("");
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setValue("text", e.target.value);
  };

  const userIds = selectedUser.map((id) => id.userId);

  const onSubmit = (data: CreateGroupChatProps) => {
    setIsLoading(true);
    createGroupChat(
      { friendId: userIds, text: data.text },
      {
        onSuccess: (data) => {
          const newChatId = data.chatId;
          reset();
          setIsLoading(false);
          setMessage("");
          setKeyword("");
          setSelectedUser([]);
          setShowSuggestions(false);
          handleAddToChatArray(newChatId);
          setIsNewMessageMaximized(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const removeSelectedUser = (index: number) => {
    setSelectedUser((prevArray) => {
      const filteredUser = prevArray.filter((user) => user.index !== index);
      const newUserArray = filteredUser.map((user, i) => ({
        ...user,
        index: i,
      }));
      return newUserArray;
    });
  };

  useEffect(() => {
    if (focusRef.current && isNewMessageMaximized) {
      focusRef.current.focus();
    }
  }, [isNewMessageMaximized, selectedUser]);

  return (
    <>
      <Card width="330px" height="450px" borderRadius="6px 6px 0 0">
        <Flex alignItems="center" padding={2}>
          <Text
            textTransform="capitalize"
            fontWeight="semibold"
            isTruncated={true}
            maxWidth="200px"
          >
            New Message
          </Text>

          <Spacer />

          <IconButton
            aria-label="close-tab"
            icon={<IoClose size="25px" />}
            bg="transparent"
            _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
            _active={{
              bg: colorMode === "dark" ? "#383838" : "gray.200",
            }}
            isRound
            size="sm"
            onClick={() => setIsNewMessageMaximized(false)}
          />
        </Flex>
        <Flex alignItems="center" padding={1} flexWrap="wrap" ml="5px" mr="5px">
          <Text mt="5px">To:</Text>
          {selectedUser.map((u) => (
            <Flex
              key={u.userId}
              padding={1}
              alignItems="center"
              borderRadius="5px"
              bg="#1877F2"
              ml="5px"
              mt="5px"
            >
              <Text
                fontSize="sm"
                whiteSpace="nowrap"
                textTransform="capitalize"
                fontWeight="semibold"
              >
                {u.firstName} {u.lastName}
              </Text>
              <IconButton
                aria-label="close-tab"
                icon={<IoClose size="20px" />}
                bg="transparent"
                _hover={{ bg: "#165BB7" }}
                isRound
                size="xs"
                ml="5px"
                onClick={() => removeSelectedUser(u.index)}
              />
            </Flex>
          ))}
          <Input
            value={keyword || ""}
            ref={focusRef}
            border="none"
            _focus={{ border: "none", boxShadow: "none" }}
            _hover={{ border: "none" }}
            onChange={handleInputChange}
            width="auto"
            mt="5px"
          />
        </Flex>
        <Divider color={colorMode === "dark" ? "#383838" : "gray.200"} />

        {keyword && showSuggestions && (
          <Box
            overflowY="auto"
            id="scrollable-new-message"
            height="auto"
            maxHeight="350px"
          >
            <InfiniteScroll
              dataLength={searchUserData}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Spinner />}
              scrollableTarget="scrollable-new-message"
            >
              {searchUser?.pages.flatMap((page) =>
                page.userList
                  .filter(
                    (user) =>
                      user.userId !== currentUserId &&
                      !selectedUser.some(
                        (selected) => selected.userId === user.userId
                      )
                  )
                  .map((user) => (
                    <Box
                      key={user.uniqueId}
                      onClick={() =>
                        handleSelectUserClick(
                          user.userId,
                          user.firstName,
                          user.lastName,
                          user.profilePicture ?? ""
                        )
                      }
                    >
                      <UserSuggestion user={user} />
                    </Box>
                  ))
              )}
            </InfiniteScroll>
          </Box>
        )}
        {selectedUser.length >= 2 && (
          <Box minHeight="50px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                position="fixed"
                bottom="0"
                width="330px"
                borderRadius="none"
                boxShadow="none"
              >
                <Flex alignItems="center" padding={2}>
                  <Input
                    {...register("text")}
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Send a message to start a chat"
                    size="sm"
                    borderRadius="20px"
                    bg={colorMode === "dark" ? "#303030" : "#F0F0F0"}
                    width="100%"
                    border="none"
                    _focus={{ border: "none", boxShadow: "none" }}
                    _hover={{ border: "none" }}
                  />
                  <IconButton
                    aria-label="send"
                    icon={<IoMdSend size="20px" />}
                    bg="transparent"
                    _hover={{
                      bg: colorMode === "dark" ? "#303030" : "gray.100",
                    }}
                    _active={{
                      bg: colorMode === "dark" ? "#383838" : "gray.200",
                    }}
                    type="submit"
                    isRound
                    size="sm"
                    ml="10px"
                    isLoading={loading}
                    isDisabled={message === "" || selectedUser.length < 2}
                  />
                </Flex>
              </Box>
            </form>
          </Box>
        )}
      </Card>
    </>
  );
};

export default NewMessage;
