import { Button, ButtonProps } from "@chakra-ui/react";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import { useUserStore } from "../../../store/user-store";

interface Props extends ButtonProps {
  children: React.ReactNode;
  strangerUserId: number;
}

const DeleteFriendRequestButton = ({
  children,
  strangerUserId,
  ...props
}: Props) => {
  const { userId: currentUserId } = useUserStore();

  const {
    mutation: deleteRequest,
    isLoading: deleteRequestIsLoading,
    setIsLoading: setDeleteRequestIsLoading,
  } = useDeleteFriendRequest(currentUserId ?? 0);

  const handleDeleteFriendRequestClick = () => {
    deleteRequest.mutate(strangerUserId);
    setDeleteRequestIsLoading(true);
  };

  return (
    <Button
      {...props}
      onClick={handleDeleteFriendRequestClick}
      isLoading={deleteRequestIsLoading}
    >
      {children}
    </Button>
  );
};

export default DeleteFriendRequestButton;
