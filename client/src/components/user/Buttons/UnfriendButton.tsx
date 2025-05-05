import { MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FaUserXmark } from "react-icons/fa6";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useUserStore } from "../../../store/user-store";

interface Props {
  strangerUserId: number;
}

const UnfriendButton = ({ strangerUserId }: Props) => {
  const { userId } = useUserStore();
  const {
    mutation: unfriend,
    isLoading: unfriendIsLoading,
    setIsLoading: setUnfriendIsLoading,
  } = useUnfriend(userId ?? 0);

  const handleUnfriendClick = () => {
    setUnfriendIsLoading(true);
    unfriend.mutate(strangerUserId);
  };

  return (
    <MenuList>
      <MenuItem
        padding={2}
        onClick={handleUnfriendClick}
        isDisabled={unfriendIsLoading}
      >
        <FaUserXmark size="25px" />
        <Text ml="10px" fontSize="lg" fontWeight="semibold">
          Unfriend
        </Text>
      </MenuItem>
    </MenuList>
  );
};

export default UnfriendButton;
