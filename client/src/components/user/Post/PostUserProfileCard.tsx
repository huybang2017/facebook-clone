import {
  Avatar,
  Box,
  Button,
  Card,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import pic from "../../../assets/profpic.jpeg";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import { useProfileStore } from "../../../store/profile-store";
import { useStoryStore } from "../../../store/story-store";
import { useUserStore } from "../../../store/user-store";
import UserProfileCardButton from "./UserProfileCardButton";

export interface ProfileCardProps {
  firstName: string;
  lastName: string;
  postUserId: number;
  profilePicture?: string;
  handleNavigateClick: () => void;
}

const PostUserProfileCard = ({
  firstName,
  lastName,
  postUserId,
  profilePicture,
  handleNavigateClick,
}: ProfileCardProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { userId } = useUserStore();
  const { data: friendshipStatus } = useGetFriendshipStatus(postUserId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(postUserId);
  const { onOpen } = useStoryStore();
  const { onOpenEditProfile } = useProfileStore();
  return (
    <Card
      padding={5}
      border="1px solid"
      borderColor="gray.500"
      boxShadow="0 0 5px 0px rgba(160, 160, 160, 0.5)"
    >
      <Box display="flex">
        <Avatar
          src={profilePicture || pic}
          height={{ base: "75px", md: "100px" }}
          width={{ base: "75px", md: "100px" }}
          mr="10px"
          cursor="pointer"
          onClick={handleNavigateClick}
        />
        <Box display="flex" flexDirection="column">
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            textTransform="capitalize"
            fontWeight="semibold"
            cursor="pointer"
            onClick={handleNavigateClick}
          >
            {firstName} {lastName}
          </Text>
          <Box display="flex" mt={{ base: "5px", md: "20px" }}>
            {userId === postUserId ? (
              <>
                <Button
                  mr="7px"
                  bg="#1877F2"
                  _hover={{ bg: "#165BB7" }}
                  ml={{ base: "10px", md: "0px" }}
                  onClick={onOpen}
                >
                  <FaPlus size="15px" />
                  {isSmallScreen ? null : <Text ml="5px">Add to Story</Text>}
                </Button>
                <Button mr="7px" onClick={onOpenEditProfile}>
                  <MdModeEdit size="20px" />
                  {isSmallScreen ? null : <Text ml="5px">Edit profile</Text>}
                </Button>
              </>
            ) : (
              <UserProfileCardButton
                friendshipStatus={friendshipStatus}
                postUserId={postUserId}
                friendRequestStatus={friendRequestStatus}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostUserProfileCard;
