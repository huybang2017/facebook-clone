import { Button, ButtonProps } from "@chakra-ui/react";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";

interface Props extends ButtonProps {
  children: React.ReactNode;
  userId: number;
}

const AcceptFriendRequestButton = ({ children, userId, ...props }: Props) => {
  const { mutation, isLoading, setIsLoading } = useAcceptFriendRequest();

  const handleAcceptFriendRequestClick = () => {
    mutation.mutate(userId);
    setIsLoading(true);
  };

  return (
    <Button
      onClick={handleAcceptFriendRequestClick}
      isLoading={isLoading}
      bg="#1877F2"
      _hover={{ bg: "#165BB7" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AcceptFriendRequestButton;
