import { Avatar, Box, Card, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { NotificationModel } from "../../../entities/Notification";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import useDeleteNotificationById from "../../../hooks/user/useDeleteNotificationById";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useMarkAsRead from "../../../hooks/user/useMarkAsRead";
import { useUserStore } from "../../../store/user-store";

interface Props {
  notification: NotificationModel;
}

const NotificationCard = ({ notification }: Props) => {
  const time = new Date(notification.timestamp);
  const { colorMode } = useColorMode();
  const [isClick, setIsClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const deleteNotification = useDeleteNotificationById();
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutation: deleteRequest } = useDeleteFriendRequest(userId ?? 0);
  const { mutation } = useAcceptFriendRequest();
  const { refetch: refetchFriendshipStatus } = useGetFriendshipStatus(
    notification.sender.userId
  );
  const { refetch: refetchPendingStatus } = useGetFriendRequestStatus(
    notification.sender.userId
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsClick(!isClick);
  };

  const handleMarkAsReadClick = () => {
    markAsRead(notification.notificationId);
  };

  const handleNavigateClick = () => {
    if (notification.notificationType === "POST_LIKED") {
      navigate(`/post/${notification.postId}`);
    } else {
      navigate(`/profile/${notification.sender.userId}`);
      refetchPendingStatus();
      refetchFriendshipStatus();
    }
    markAsRead(notification.notificationId);
  };

  const handleAcceptFriendRequestClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    mutation.mutate(notification.sender.userId);
  };

  const handleDeleteFriendRequestClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    deleteRequest.mutate(notification.sender.userId);
  };

  const handleDeleteNotificationClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    deleteNotification.mutate(notification.notificationId);
  };

  const buttonStyle = {
    px: 4,
    py: 2,
    fontSize: "md",
    fontWeight: "semibold",
    color: "white.500",
    borderRadius: "6px",
    transition: "background 0.3s",
  };

  return (
    <Box position="relative" mb="5px" mt="5px">
      <Flex alignItems="center" onClick={handleNavigateClick}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Avatar
            src={notification.sender.profilePicture || pic}
            cursor="pointer"
            height="55px"
            width="55px"
          />
          <Box
            border="1px solid"
            borderRadius="full"
            width="30px"
            height="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderColor="#1877F2"
            bg="#1877F2"
            mr="5px"
            cursor="pointer"
            position="absolute"
            bottom="-5px"
            right="-10px"
          >
            {notification.notificationType === "POST_LIKED" ? (
              <BiSolidLike size="20px" />
            ) : (
              <FaUser size="17px" />
            )}
          </Box>
        </Box>

        <Box
          ml="15px"
          width="200px"
          color={notification.read ? "gray.500" : "white.500"}
        >
          <Text fontSize="sm">
            <Text as="span" fontWeight="semibold" textTransform="capitalize">
              {notification.sender.firstName} {notification.sender.lastName}{" "}
            </Text>
            {notification.message}
            {notification.content ? ":" : null}
          </Text>
          <Text fontSize="sm" isTruncated={true}>
            {notification?.content}
          </Text>
          <Text
            fontSize="sm"
            color={notification.read ? "gray.500" : "#1877F2"}
            fontWeight="semibold"
          >
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
        </Box>

        <Box
          onClick={handleButtonClick}
          // onMouseLeave={() => setIsHover(false)}
          // position="relative"
          mr="15px"
          ml="15px"
          height="30px"
          width="30px"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="transparent"
          _hover={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
          _active={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
          _focus={{ boxShadow: "outline" }}
        >
          <HiOutlineDotsHorizontal size="25px" />
          {isClick && (
            <Card
              position="absolute"
              right="50px"
              top="-9px"
              padding={2}
              zIndex={100}
              onClick={handleButtonClick}
            >
              {!notification.read && (
                <Flex
                  _hover={{
                    bg: colorMode === "dark" ? "gray.600" : "gray.200",
                  }}
                  minWidth="200px"
                  padding={1}
                  alignItems="center"
                  onClick={handleMarkAsReadClick}
                >
                  <Box mr="10px">
                    <FaCheck size="20px" />
                  </Box>
                  <Text fontWeight="semibold">Mark as read</Text>
                </Flex>
              )}
              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
                onClick={handleDeleteNotificationClick}
              >
                <Box mr="10px">
                  <GoTrash size="20px" />
                </Box>
                <Text fontWeight="semibold">Delete Notification</Text>
              </Flex>
            </Card>
          )}
        </Box>

        {!notification.read && (
          <Box h="10px" w="10px" bg="#1877F2" borderRadius="full" />
        )}
      </Flex>
      {notification.notificationType === "FRIEND_REQUEST" && (
        <Flex ml="70px" mt="10px">
          <Box
            {...buttonStyle}
            mr="10px"
            bg="#1877F2"
            _hover={{ bg: "#165BB7" }}
            onClick={handleAcceptFriendRequestClick}
          >
            Confirm
          </Box>
          <Box
            {...buttonStyle}
            bg="gray.500"
            _hover={{ bg: "gray.600" }}
            onClick={handleDeleteFriendRequestClick}
          >
            Delete
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default NotificationCard;
