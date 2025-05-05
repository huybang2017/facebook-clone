import { Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import pic from "../../../assets/profpic.jpeg";
import { ChatModel } from "../../../entities/Chat";
import useHandleAddToChatArray from "../../../hooks/user/useHandleAddToChatArray";

interface ChatProps {
  chat: ChatModel;
}

const ChatList = ({ chat }: ChatProps) => {
  const { colorMode } = useColorMode();
  const { handleAddToChatArray } = useHandleAddToChatArray();
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        maxWidth="300px"
        padding="10px"
        borderRadius="5px"
        _hover={{
          bg: colorMode === "dark" ? "gray.700" : "gray.200",
        }}
        onClick={() => handleAddToChatArray(chat.chatId)}
      >
        <Avatar
          src={
            chat?.chatType === "PRIVATE_CHAT"
              ? chat?.privateChatUser?.profilePicture
              : chat?.chatType === "GROUP_CHAT"
              ? chat?.groupChatImage
              : pic
          }
          height="32px"
          width="32px"
        />
        <Text
          ml="10px"
          isTruncated={true}
          textTransform="capitalize"
          fontWeight="semibold"
        >
          {chat?.chatType === "PRIVATE_CHAT"
            ? `${chat?.privateChatUser?.firstName}` +
              " " +
              `${chat?.privateChatUser?.lastName}`
            : chat.groupChatName
            ? chat.groupChatName
            : "New Group Chat"}
        </Text>
      </Box>
    </>
  );
};

export default ChatList;
