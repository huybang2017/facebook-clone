import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaEdit, FaUserPlus, FaUsers } from "react-icons/fa";
import { IoChevronDown, IoClose, IoExitOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useAddUserToGroupChat, {
  AddUserToGroupChatProps,
} from "../../../hooks/user/useAddUserToGroupChat";
import useFetchAllChatMessages from "../../../hooks/user/useFetchAllChatMessages";
import useHandleSelectUserClick from "../../../hooks/user/useHandleSelectUserClick";
import useLeaveGroupChat from "../../../hooks/user/useLeaveGroupChat";
import useSearchUser from "../../../hooks/user/useSearchUser";
import usesGetChatById from "../../../hooks/user/usesGetChatById";
import useUpdateGroupChatName, {
  UpdateGroupChatNameProps,
} from "../../../hooks/user/useUpdateGroupChatName";
import useUploadGroupChatImage from "../../../hooks/user/useUploadGroupChatImage";
import { useChatStore } from "../../../store/chat-store";
import { useMessageStore } from "../../../store/message-store";
import UserSuggestion from "../Navbar/UserSuggestion";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
interface Props {
  chatId: number;
  index: number;
  userId: number;
  isMaximized: boolean;
}

const ChatCard = ({ chatId, index, userId, isMaximized }: Props) => {
  const { colorMode } = useColorMode();
  const { setChatArray, isNewMessageMaximized } = useChatStore();
  const { messagesByChatId, setMessageModels } = useMessageStore();
  const { data: getChatById } = usesGetChatById(chatId, userId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const focusRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { data: fetchMessages } = useFetchAllChatMessages({
    chatId: chatId,
    pageSize: 1000,
  });
  const { handleSelectUserClick, selectedUser, setSelectedUser } =
    useHandleSelectUserClick();

  useEffect(() => {
    if (fetchMessages) {
      const allChatMessages = fetchMessages.pages.flatMap(
        (page) => page.messageModels
      );
      setMessageModels(chatId, allChatMessages);
    }
  }, [fetchMessages, setMessageModels, chatId]);

  const messages = messagesByChatId[chatId] || [];

  useEffect(() => {
    if (focusRef.current && getChatById) {
      focusRef.current.focus();
    }
  }, [getChatById]);

  const minimizeChat = (index: number) => {
    setChatArray((prevArray) => {
      const updatedArray = prevArray.map((chat, i) =>
        i === index ? { ...chat, isMaximized: false } : chat
      );

      const minimizedChat = updatedArray[index];
      const remainingChat = updatedArray.filter((_, i) => i !== index);
      const newChatArray = [...remainingChat, minimizedChat].map((chat, i) => ({
        ...chat,
        index: i,
      }));
      return newChatArray;
    });
  };

  const maximizeChat = (index: number) => {
    setChatArray((prevArray) => {
      const updatedArray = prevArray.map((chat, i) =>
        i === index ? { ...chat, isMaximized: true } : chat
      );

      const maximizeChat = updatedArray[index];
      const remainingChat = updatedArray.filter((_, i) => i !== index);
      const newChatArray = [maximizeChat, ...remainingChat].map((chat, i) => ({
        ...chat,
        index: i,
      }));
      return newChatArray;
    });
  };

  const closeChat = (index: number) => {
    setChatArray((prevArray) => {
      const filteredArray = prevArray.filter((chat) => chat.index !== index);
      const newChatArray = filteredArray.map((chat, i) => ({
        ...chat,
        index: i,
      }));
      return newChatArray;
    });
  };

  const handleMinimizeClick = () => {
    minimizeChat(index);
    setIsHover(false);
  };

  const picture =
    getChatById?.chatType === "PRIVATE_CHAT"
      ? getChatById?.privateChatUser?.profilePicture
      : getChatById?.chatType === "GROUP_CHAT"
      ? getChatById?.groupChatImage
      : pic;

  const chatName =
    getChatById?.chatType === "PRIVATE_CHAT"
      ? `${getChatById?.privateChatUser?.firstName}` +
        " " +
        `${getChatById?.privateChatUser?.lastName}`
      : getChatById?.groupChatName
      ? getChatById?.groupChatName
      : "New Group Chat";

  const handleNavigateClick = () => {
    navigate(`/profile/${getChatById?.privateChatUser?.userId}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdateName,
    onOpen: onOpenUpdateName,
    onClose: onCloseUpdateName,
  } = useDisclosure();
  const {
    isOpen: isOpenAddUser,
    onOpen: onOpenAddUser,
    onClose: onCloseAddUser,
  } = useDisclosure();

  const { mutate: uploadPhoto } = useUploadGroupChatImage(chatId);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhoto({ file: file });
    }
  };
  const { handleSubmit, setValue } = useForm<UpdateGroupChatNameProps>();

  const [name, setName] = useState<string>("");
  const { mutate: updateGroupChatName } = useUpdateGroupChatName();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const handleUpdateNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setValue("name", e.target.value);
  };

  const onSubmit = (data: UpdateGroupChatNameProps) => {
    setIsLoading(true);
    updateGroupChatName(
      { chatId: chatId, name: data.name },
      {
        onSuccess: () => {
          setIsLoading(false);
          setName("");
          onCloseUpdateName();
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const toast = useToast();
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingAddToUser, setIsLoadingAddToUser] = useState(false);
  const { handleSubmit: handleAddUserSubmit } =
    useForm<AddUserToGroupChatProps>();
  const {
    data: searchUser,
    fetchNextPage,
    hasNextPage,
  } = useSearchUser({
    keyword: keyword,
    pageSize: 15,
  });

  const searchUserData =
    searchUser?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    setKeyword(text);
    setShowSuggestions(true);
  };

  const userIds = selectedUser.map((id) => id.userId);
  const { mutate: addUserToGroupChat } = useAddUserToGroupChat(chatId);
  const queryClient = useQueryClient();
  const onSubmitAddToGroupChat = () => {
    setIsLoadingAddToUser(true);
    addUserToGroupChat(
      { userId: userIds },
      {
        onSuccess: () => {
          setKeyword("");
          setSelectedUser([]);
          setShowSuggestions(false);
          setIsLoadingAddToUser(false);
          queryClient.invalidateQueries(["chatById", chatId, userId]);
          queryClient.invalidateQueries(["messages", chatId]);
          toast({
            title: "Group Chat",
            description: "Selected user(s) have joined the chat.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "bottom-left",
          });
          onCloseAddUser();
        },
        onError: () => {
          setIsLoadingAddToUser(false);
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

  const { mutate: leaveGroupChat } = useLeaveGroupChat();

  const handleLeaveGroupChatClick = () => {
    leaveGroupChat({
      chatId: chatId,
      userId: userId,
      leaveReason: "LEFT",
    });
    closeChat(index);
  };

  const handleNavigateProfileClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      {isMaximized ? (
        <Box
          position="fixed"
          bottom="0"
          right={
            isNewMessageMaximized
              ? index === 0
                ? "425px"
                : index === 1
                ? "765px"
                : index === 2
                ? "1105px"
                : undefined
              : index === 0
              ? "85px"
              : index === 1
              ? "425px"
              : index === 2
              ? "765px"
              : undefined
          }
          display="flex"
        >
          <Card width="330px" height="450px" borderRadius="6px 6px 0 0">
            <Box>
              <Flex alignItems="center">
                <Menu>
                  <MenuButton
                    alignItems="center"
                    _hover={{
                      bg: colorMode === "dark" ? "#303030" : "gray.100",
                    }}
                    _active={{
                      bg: colorMode === "dark" ? "#383838" : "gray.200",
                    }}
                    cursor="pointer"
                    padding="8px"
                    borderTopLeftRadius="6px"
                    margin="0"
                  >
                    <Flex alignItems="center">
                      <Avatar src={picture} cursor="pointer" size="sm" />
                      <Text
                        ml="5px"
                        textTransform="capitalize"
                        fontWeight="semibold"
                        isTruncated={true}
                        maxWidth="200px"
                        mr="5px"
                      >
                        {chatName}
                      </Text>
                      <Box color="gray.500">
                        <IoChevronDown />
                      </Box>
                    </Flex>
                  </MenuButton>
                  <Portal>
                    <MenuList
                      position="absolute"
                      bottom="60px"
                      left="0px"
                      border="none"
                      zIndex={1500}
                    >
                      {getChatById?.chatType === "PRIVATE_CHAT" && (
                        <MenuItem onClick={handleNavigateClick}>
                          <CgProfile size="20px" />
                          <Text ml="10px">View Profile</Text>
                        </MenuItem>
                      )}
                      {getChatById?.chatType === "GROUP_CHAT" && (
                        <>
                          <MenuItem onClick={onOpenUpdateName}>
                            <FaEdit size="20px" />
                            <Text ml="10px">Conversation Name</Text>
                          </MenuItem>
                          <MenuItem onClick={handleInputClick}>
                            <MdAddPhotoAlternate size="20px" />
                            <Text ml="10px">Change photo</Text>
                          </MenuItem>
                          <input
                            type="file"
                            accept=".jpeg, .png"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleUploadImage}
                          />
                          <MenuItem onClick={onOpenAddUser}>
                            <FaUserPlus size="20px" />
                            <Text ml="10px">Add people</Text>
                          </MenuItem>
                          <MenuItem onClick={onOpen}>
                            <FaUsers size="20px" />
                            <Text ml="10px">Members</Text>
                          </MenuItem>
                          <MenuItem onClick={handleLeaveGroupChatClick}>
                            <IoExitOutline size="20px" />
                            <Text ml="10px">Leave group</Text>
                          </MenuItem>
                        </>
                      )}
                    </MenuList>
                  </Portal>
                </Menu>
                <Spacer />
                <IconButton
                  aria-label="minimize"
                  icon={<VscChromeMinimize size="20px" />}
                  bg="transparent"
                  _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
                  _active={{
                    bg: colorMode === "dark" ? "#383838" : "gray.200",
                  }}
                  isRound
                  size="sm"
                  onClick={handleMinimizeClick}
                />
                <IconButton
                  aria-label="close"
                  icon={<IoClose size="25px" />}
                  bg="transparent"
                  _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
                  _active={{
                    bg: colorMode === "dark" ? "#383838" : "gray.200",
                  }}
                  isRound
                  size="sm"
                  mr="3px"
                  onClick={() => closeChat(index)}
                />
              </Flex>
              <Divider color={colorMode === "dark" ? "#383838" : "gray.200"} />
            </Box>

            <Box overflowY="auto" height="410px">
              <Flex
                justifyContent="center"
                alignItems="center"
                mt="20px"
                flexDirection="column"
              >
                <Avatar src={picture} size="lg" />
                <Text
                  fontSize="lg"
                  textTransform="capitalize"
                  fontWeight="semibold"
                  mt="10px"
                  mb="20px"
                >
                  {chatName}
                </Text>
              </Flex>

              {messages.map((msg: any) => (
                <Messages
                  key={msg.messageId}
                  message={msg}
                  isSender={msg.sender.userId === userId}
                />
              ))}
            </Box>

            <Box height="65px">
              <WriteMessage chatId={chatId} focusRef={focusRef} />
            </Box>
          </Card>
        </Box>
      ) : (
        <>
          <Box
            position="relative"
            bottom="75px"
            right="-63px"
            display="flex"
            flexDirection="column"
            mt="10px"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover && (
              <>
                <Box
                  position="absolute"
                  right="-10px"
                  bottom="30px"
                  zIndex={10}
                >
                  <IconButton
                    aria-label="close"
                    icon={<IoClose size="20px" />}
                    bg={colorMode === "dark" ? "#303030" : "gray.200"}
                    _hover={{
                      bg: colorMode === "dark" ? "#484848" : "gray.300",
                    }}
                    isRound
                    size="xs"
                    mr="3px"
                    onClick={() => closeChat(index)}
                  />
                </Box>
                <Card
                  position="absolute"
                  right="55px"
                  bottom="5px"
                  padding={2}
                  zIndex={20}
                >
                  <Text
                    textTransform="capitalize"
                    fontWeight="bold"
                    isTruncated={true}
                    maxWidth="200px"
                    fontSize="sm"
                  >
                    {chatName}
                  </Text>
                </Card>
              </>
            )}
            <Avatar
              src={picture}
              onClick={() => maximizeChat(index)}
              cursor="pointer"
            />
          </Box>
        </>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        finalFocusRef={focusRef}
      >
        <ModalOverlay />
        <ModalContent height="500px">
          <ModalHeader textAlign="center">Members</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody maxHeight="450px" overflowY="auto">
            {getChatById?.chatType === "GROUP_CHAT" &&
              getChatById.users?.map((users) => (
                <Box
                  display="flex"
                  alignItems="center"
                  mt="10px"
                  cursor="pointer"
                  key={users.userId}
                >
                  <Avatar
                    src={users.profilePicture || pic}
                    width="40px"
                    height="40px"
                    mr="10px"
                    onClick={() => handleNavigateProfileClick(users.userId)}
                  />

                  <Text
                    fontSize="md"
                    textTransform="capitalize"
                    fontWeight="semibold"
                    onClick={() => handleNavigateProfileClick(users.userId)}
                    isTruncated={true}
                  >
                    {users.firstName} {users.lastName}
                  </Text>
                  <Spacer />
                  {userId !== users.userId && (
                    <Button
                      onClick={() =>
                        leaveGroupChat({
                          chatId: chatId,
                          userId: users.userId,
                          leaveReason: "KICKED",
                        })
                      }
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenUpdateName}
        onClose={onCloseUpdateName}
        size="xl"
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={focusRef}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Change chat name</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
              <Text>
                Changing the name of a group chat changes it for everyone.
              </Text>
              <Input
                ref={initialRef}
                mt="10px"
                onChange={handleUpdateNameChange}
                value={name}
                placeholder={"Group Chat Name"}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onCloseUpdateName}
                variant="ghost"
                mr="5px"
                width="100px"
              >
                Cancel
              </Button>
              <Button
                isLoading={loading}
                type="submit"
                isDisabled={name === "" ? true : false}
                bg="#1877F2"
                _hover={{ bg: "#165BB7" }}
                width="100px"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenAddUser}
        onClose={onCloseAddUser}
        size="xl"
        isCentered
        finalFocusRef={focusRef}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <form onSubmit={handleAddUserSubmit(onSubmitAddToGroupChat)}>
          <ModalContent height="500px">
            <ModalHeader textAlign="center">Add people</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody
              maxHeight="450px"
              overflowY="auto"
              id="scrollable-add-user"
            >
              <InputGroup mt="10px" mb="10px">
                <Input
                  value={keyword || ""}
                  ref={initialRef}
                  onChange={handleSearchInputChange}
                  borderRadius={20}
                  placeholder="Search Facebook"
                  variant="filled"
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Search"
                    icon={<BsSearch />}
                    type="submit"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  />
                </InputRightElement>
              </InputGroup>
              <SimpleGrid columns={{ base: 5 }} spacing={1}>
                {selectedUser.map((u) => (
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    position="relative"
                    key={u.userId}
                    mt="10px"
                  >
                    <Avatar src={u.profilePicture} />
                    <IconButton
                      aria-label="close-tab"
                      icon={<IoClose size="20px" />}
                      bg="#303030"
                      _hover={{ bg: "#383838" }}
                      isRound
                      size="xs"
                      ml="5px"
                      onClick={() => removeSelectedUser(u.index)}
                      position="absolute"
                      right="10px"
                      top="-5px"
                    />
                    <Text
                      fontSize="xs"
                      textTransform="capitalize"
                      fontWeight="semibold"
                      isTruncated={true}
                    >
                      {u.firstName} {u.lastName}
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>
              {keyword && showSuggestions && (
                <Box
                  // overflowY="auto"
                  // id="scrollable-add-user"
                  // height="auto"
                  // maxHeight="350px"
                  mt="10px"
                >
                  <InfiniteScroll
                    dataLength={searchUserData}
                    next={fetchNextPage}
                    hasMore={!!hasNextPage}
                    loader={<Spinner />}
                    scrollableTarget="scrollable-add-user"
                  >
                    {searchUser?.pages.flatMap((page) =>
                      page.userList
                        .filter(
                          (user) =>
                            user.userId !== userId &&
                            !getChatById?.users?.some(
                              (selected) => selected.userId === user.userId
                            ) &&
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
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoadingAddToUser}
                type="submit"
                isDisabled={selectedUser.length < 1 ? true : false}
                bg="#1877F2"
                _hover={{ bg: "#165BB7" }}
                width="100%"
              >
                Add people
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ChatCard;
