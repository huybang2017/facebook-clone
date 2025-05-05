import {
  Box,
  Button,
  Menu,
  MenuButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFacebookMessenger, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { FriendshipStatusProps } from "../../../hooks/user/useGetFriendshipStatus";
import AcceptFriendRequestButton from "../Buttons/AcceptFriendRequestButton";
import AddFriendButton from "../Buttons/AddFriendButton";
import UnfriendButton from "../Buttons/UnfriendButton";
import MessageButton from "../Buttons/MessageButton";

interface Props {
  friendshipStatus?: FriendshipStatusProps;
  postUserId: number;
  friendRequestStatus?: FriendshipStatusProps;
}

const UserProfileCardButton = ({
  friendshipStatus,
  postUserId,
  friendRequestStatus,
}: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {friendshipStatus && friendshipStatus?.status === "FRIENDS" ? (
        <Menu>
          <MenuButton as={Button} mr="7px">
            <Box display="flex">
              <FaUserCheck size="20px" />
              {isSmallScreen ? null : <Text ml="10px">Friends</Text>}
            </Box>
          </MenuButton>
          <UnfriendButton strangerUserId={postUserId} />
        </Menu>
      ) : friendRequestStatus && friendRequestStatus?.status === "PENDING" ? (
        <>
          <AcceptFriendRequestButton userId={postUserId} mr="7px">
            <FaUserPlus size="20px" />
            {isSmallScreen ? null : <Text ml="10px">Respond</Text>}
          </AcceptFriendRequestButton>
        </>
      ) : (
        <Box mr="7px">
          <AddFriendButton
            userId={postUserId}
            friendshipStatus={friendshipStatus?.status}
          >
            {friendshipStatus && friendshipStatus?.status === "PENDING" ? (
              <>
                <FaUserXmark size="20px" />
                {isSmallScreen ? null : <Text ml="10px">Cancel request</Text>}
              </>
            ) : (
              <>
                <FaUserPlus size="20px" />
                {isSmallScreen ? null : <Text ml="10px">Add friend</Text>}
              </>
            )}
          </AddFriendButton>
        </Box>
      )}
      <MessageButton friendId={postUserId}>
        <FaFacebookMessenger size="20px" />
        {isSmallScreen ? null : <Text ml="5px">Message</Text>}
      </MessageButton>
    </>
  );
};

export default UserProfileCardButton;
