import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";
import useAddToFriend from "../../../hooks/user/useAddToFriend";

interface Props extends ButtonProps {
  children: React.ReactNode;
  userId: number;
  friendshipStatus?: string;
}

const AddFriendButton = ({ children, userId, friendshipStatus }: Props) => {
  const { colorMode } = useColorMode();
  const { mutation: addFriend, isLoading, setIsLoading } = useAddToFriend();
  const handleAddFriendClick = () => {
    addFriend.mutate(userId);
    setIsLoading(true);
  };
  return (
    <Button
      onClick={handleAddFriendClick}
      isLoading={isLoading}
      bg={friendshipStatus === "PENDING" ? undefined : "#1877F2"}
      _hover={{
        bg:
          friendshipStatus === "PENDING" && colorMode === "dark"
            ? "#3a3a3a"
            : friendshipStatus === "PENDING" && colorMode === "light"
            ? "gray.300"
            : "#165BB7",
      }}
    >
      {children}
    </Button>
  );
};

export default AddFriendButton;
