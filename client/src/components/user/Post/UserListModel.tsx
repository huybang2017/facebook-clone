import {
  Avatar,
  Box,
  Button,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { UserData } from "../../../entities/User";

import { CgProfile } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaUserPlus, FaUserXmark } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
import AcceptFriendRequestButton from "../Buttons/AcceptFriendRequestButton";
import AddFriendButton from "../Buttons/AddFriendButton";
import MessageButton from "../Buttons/MessageButton";

interface Props {
  users: UserData;
}

const UserListModel = ({ users }: Props) => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { setIsProfile } = useProfileStore();
  const { data: friendshipStatus } = useGetFriendshipStatus(users.userId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(users.userId);

  const handleNavigateClick = () => {
    navigate(`/profile/${users.userId}`);
    setIsProfile(true);
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Box display="flex" alignItems="center" mt="15px" cursor="pointer">
      <Avatar
        src={users.profilePicture || pic}
        width="40px"
        height="40px"
        mr="10px"
        onClick={handleNavigateClick}
      />

      <Text
        fontSize="md"
        textTransform="capitalize"
        fontWeight="semibold"
        onClick={handleNavigateClick}
        isTruncated={true}
      >
        {users.firstName} {users.lastName}
      </Text>
      <Spacer />
      {users.userId === userId ? (
        <Button onClick={handleNavigateClick}>
          {isSmallScreen ? null : <CgProfile size="20px" />}
          <Text
            ml={{ base: "0", md: "5px" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            My Profile
          </Text>
        </Button>
      ) : friendshipStatus?.status === "FRIENDS" ? (
        <MessageButton friendId={users.userId}>
          {isSmallScreen ? null : <FaFacebookMessenger size="20px" />}
          <Text
            ml={{ base: "0", md: "5px" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            Message
          </Text>
        </MessageButton>
      ) : friendRequestStatus?.status === "PENDING" ? (
        <AcceptFriendRequestButton userId={users.userId}>
          {isSmallScreen ? null : <IoPersonAddSharp size="20px" />}
          <Text
            ml={{ base: "0", md: "5px" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            Confirm {!isSmallScreen && <Text as="span"> request</Text>}
          </Text>
        </AcceptFriendRequestButton>
      ) : (
        <AddFriendButton
          userId={users.userId}
          friendshipStatus={friendshipStatus?.status}
        >
          {friendshipStatus?.status === "PENDING" ? (
            <>
              {isSmallScreen ? null : <FaUserXmark size="20px" />}
              <Text
                ml={{ base: "0", md: "5px" }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Cancel {!isSmallScreen && <Text as="span">request</Text>}
              </Text>
            </>
          ) : (
            <>
              {isSmallScreen ? null : <FaUserPlus size="20px" />}
              <Text
                ml={{ base: "0", md: "5px" }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Add friend
              </Text>
            </>
          )}
        </AddFriendButton>
      )}
    </Box>
  );
};

export default UserListModel;
