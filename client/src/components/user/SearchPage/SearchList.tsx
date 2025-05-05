import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FaFacebookMessenger, FaUserPlus, FaUserXmark } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import { useUserStore } from "../../../store/user-store";
import AcceptFriendRequestButton from "../Buttons/AcceptFriendRequestButton";
import AddFriendButton from "../Buttons/AddFriendButton";
import MessageButton from "../Buttons/MessageButton";

interface Props {
  user: UserDataModelList;
}

const SearchList = ({ user }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const { userId: currentUserId } = useUserStore();
  const handleNavigateClick = () => {
    navigate(`/profile/${user.userId}`);
  };

  const { data: friendshipStatus } = useGetFriendshipStatus(user.userId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(user.userId);

  return (
    <Flex justifyContent="space-between" alignItems="center" padding={2}>
      <Flex alignItems="center">
        <Avatar
          src={user.profilePicture || pic}
          cursor="pointer"
          height={{ base: "45px", md: "60px" }}
          width={{ base: "45px", md: "60px" }}
          onClick={handleNavigateClick}
        />

        <Text
          ml="10px"
          textTransform="capitalize"
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "lg" }}
          isTruncated={true}
          width={{ base: "100px", md: "300px" }}
          onClick={handleNavigateClick}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          {user.firstName} {user.lastName}
        </Text>
      </Flex>
      {currentUserId === user.userId ? (
        <Button onClick={handleNavigateClick}>
          {isSmallScreen ? null : <CgProfile size="20px" />}
          <Text
            fontSize={{ base: "sm", md: "md" }}
            ml={{ base: "0", md: "5px" }}
          >
            My Profile
          </Text>
        </Button>
      ) : (
        <>
          {friendshipStatus && friendshipStatus?.status === "FRIENDS" ? (
            <MessageButton friendId={user.userId}>
              {isSmallScreen ? null : <FaFacebookMessenger size="20px" />}
              <Text
                ml={{ base: "0", md: "5px" }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Message
              </Text>
            </MessageButton>
          ) : friendRequestStatus &&
            friendRequestStatus?.status === "PENDING" ? (
            <>
              <AcceptFriendRequestButton userId={user.userId}>
                {isSmallScreen ? null : <IoPersonAddSharp size="20px" />}
                <Text
                  ml={{ base: "0", md: "5px" }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Confirm {!isSmallScreen && <Text as="span"> request</Text>}
                </Text>
              </AcceptFriendRequestButton>
            </>
          ) : (
            <AddFriendButton
              userId={user.userId}
              friendshipStatus={friendshipStatus?.status}
            >
              {friendshipStatus && friendshipStatus?.status === "PENDING" ? (
                <>
                  {isSmallScreen ? null : <FaUserXmark size="20px" />}

                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    ml={{ base: "0", md: "5px" }}
                  >
                    Cancel {!isSmallScreen && <Text as="span"> request</Text>}
                  </Text>
                </>
              ) : (
                <>
                  {!isSmallScreen && (
                    <Box mr="10px">
                      <FaUserPlus size="20px" />
                    </Box>
                  )}
                  <Text fontSize={{ base: "sm", md: "md" }}>Add Friend</Text>
                </>
              )}
            </AddFriendButton>
          )}
        </>
      )}
    </Flex>
  );
};

export default SearchList;
