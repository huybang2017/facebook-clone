import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import useChatUser from "../../../hooks/user/useChatUser";
import useHandleAddToChatArray from "../../../hooks/user/useHandleAddToChatArray";

interface Props extends ButtonProps {
  children: React.ReactNode;
  friendId: number;
}

const MessageButton = ({ friendId, children, ...props }: Props) => {
  const { mutate: chatUser } = useChatUser();
  const { handleAddToChatArray } = useHandleAddToChatArray();

  const handleChatUserClick = () => {
    chatUser(
      { friendId: friendId },
      {
        onSuccess: (data) => {
          const newChatId = data.chatId;
          handleAddToChatArray(newChatId);
        },
      }
    );
  };

  return (
    <>
      <Button color="#1877F2" onClick={handleChatUserClick} {...props}>
        {children}
      </Button>
    </>
  );
};

export default MessageButton;
