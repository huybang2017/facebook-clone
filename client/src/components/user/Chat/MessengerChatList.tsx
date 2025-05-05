import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { ChatModel } from "../../../entities/Chat";
import { useMessageStore } from "../../../store/message-store";
import { useUserStore } from "../../../store/user-store";
import useGetLastMessage from "../../../hooks/user/useGetLastMessage";
import { useEffect } from "react";

interface ChatProps {
  chat: ChatModel;
}

const MessengerChatList = ({ chat }: ChatProps) => {
  const { userId } = useUserStore();
  // const { colorMode } = useColorMode();
  // const [isClick, setIsClick] = useState<boolean>(false);
  // const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   event.stopPropagation();
  //   setIsClick(!isClick);
  // };
  const { data: getLastMessage, refetch: refetchLastMessage } =
    useGetLastMessage(chat.chatId);
  const { messagesByChatId } = useMessageStore();
  // const getLastMessage = messagesByChatId[chat.chatId]?.at(-1);
  const time = new Date(getLastMessage?.timestamp ?? "");

  useEffect(() => {
    refetchLastMessage();
  }, [messagesByChatId[chat.chatId]]);

  return (
    <Box position="relative" mb="5px" mt="5px">
      <Flex alignItems="center">
        <Avatar
          src={
            chat.chatType === "PRIVATE_CHAT"
              ? chat.privateChatUser?.profilePicture
              : chat.chatType === "GROUP_CHAT"
              ? chat.groupChatImage
              : pic
          }
          cursor="pointer"
          height="55px"
          width="55px"
        />
        <Box ml="10px" maxWidth="170px" minWidth="170px">
          <Text
            fontSize="md"
            textTransform="capitalize"
            fontWeight="semibold"
            isTruncated={true}
          >
            {chat.chatType === "PRIVATE_CHAT"
              ? `${chat.privateChatUser?.firstName}` +
                " " +
                `${chat.privateChatUser?.lastName}`
              : chat.groupChatName
              ? chat.groupChatName
              : "New Group Chat"}
          </Text>

          {getLastMessage?.message ? (
            <Box>
              <Text fontSize="sm" isTruncated={true}>
                {getLastMessage.sender.userId === userId ? (
                  "You: "
                ) : (
                  <Text as="span" textTransform="capitalize">
                    {getLastMessage?.sender.firstName}:{" "}
                  </Text>
                )}
                {getLastMessage?.message}
              </Text>

              <Text fontSize="xs" fontWeight="semibold" color="#1877F2">
                <ReactTimeAgo date={time} locale="en-US" />
              </Text>
            </Box>
          ) : (
            <Text fontSize="sm" color="gray.500">
              send{" "}
              <Text as="span" textTransform="capitalize">
                {chat.chatType === "PRIVATE_CHAT"
                  ? `${chat.privateChatUser?.firstName}`
                  : chat.groupChatName}
              </Text>{" "}
              a message
            </Text>
          )}
        </Box>

        {/* <Box
          onClick={handleButtonClick}
          // onMouseLeave={() => setIsHover(false)}
          // position="relative"
          mr="10px"
          height="30px"
          width="30px"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="transparent"
          _hover={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
          _active={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
          _focus={{ boxShadow: "outline" }}
        >
          <HiOutlineDotsHorizontal size="25px" />
          {isClick && (
            <Card
              position="absolute"
              right="55px"
              top="-9px"
              padding={2}
              zIndex={100}
              onClick={handleButtonClick}
            >
              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
              >
                <Box mr="10px">
                  <FaCheck size="20px" />
                </Box>
                <Text fontWeight="semibold">Mark as read</Text>
              </Flex>

              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
              >
                <Box mr="10px">
                  <GoTrash size="20px" />
                </Box>
                <Text fontWeight="semibold">Delete chat</Text>
              </Flex>

              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
              >
                <Box mr="10px">
                  <GoTrash size="20px" />
                </Box>
                <Text fontWeight="semibold">View Profile</Text>
              </Flex>
            </Card>
          )}
        </Box>

        <Box h="10px" w="10px" bg="#1877F2" borderRadius="full" /> */}
      </Flex>
    </Box>
  );
};

export default MessengerChatList;
