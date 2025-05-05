import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllNotifications from "../../../hooks/user/useFetchAllNotifications";
import useGetNotificationCount from "../../../hooks/user/useGetNotificationCount";
import { useNotificationStore } from "../../../store/notification-store";
import { useUserStore } from "../../../store/user-store";
import NotificationCard from "./NotificationCard";

const Notifications = () => {
  const { userId } = useUserStore();
  const { data: getNotificationCount, refetch: refetchNotificationCount } =
    useGetNotificationCount(userId ?? 0);
  const { setNotificationModels, notificationModels } = useNotificationStore();
  const { colorMode } = useColorMode();
  const {
    data: fetchAllNotifications,
    fetchNextPage,
    hasNextPage,
    refetch: refetchNotifications,
  } = useFetchAllNotifications({
    userId: userId,
    pageSize: 6,
  });

  const fetchNotificationsData =
    fetchAllNotifications?.pages.reduce(
      (total, page) => total + page.notificationModels.length,
      0
    ) || 0;

  useEffect(() => {
    if (fetchAllNotifications) {
      const allNotifications = fetchAllNotifications.pages.flatMap(
        (page) => page.notificationModels
      );
      setNotificationModels(allNotifications);
    }
  }, [fetchAllNotifications, setNotificationModels]);

  const prevNotificationModels = useRef(notificationModels.length);

  useEffect(() => {
    if (prevNotificationModels.current !== notificationModels.length) {
      refetchNotificationCount();
      refetchNotifications();
      prevNotificationModels.current = notificationModels.length;
    }
  }, [notificationModels]);

  return (
    <>
      <Flex justifyContent="center">
        <Menu>
          <MenuButton
            as={Box}
            aria-label="Notifications"
            cursor="pointer"
            height="36px"
            width="36px"
            bg={colorMode === "dark" ? "#303030" : "gray.100"}
            borderRadius="20px"
            _hover={{
              bg: colorMode === "dark" ? "#383838" : "gray.200",
            }}
            display="flex"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center">
              <IoMdNotifications size="24px" />
            </Box>
          </MenuButton>

          <MenuList border="none">
            <Box ml="10px" mb="5px">
              <Text fontWeight="bold" fontSize="x-large" ml="5px">
                Notifications
              </Text>
            </Box>
            {notificationModels.length === 0 ? (
              <Box
                height="150px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="250px"
              >
                <Flex flexDirection="column" alignItems="center">
                  <IoMdNotificationsOff size="50px" />
                  <Text mt="10px" fontSize="x-large">
                    No notifications yet
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Box
                maxHeight="400px"
                overflowY="auto"
                id="scrollable-notification"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "gray",
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                  },
                }}
              >
                <InfiniteScroll
                  dataLength={fetchNotificationsData}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={<Spinner />}
                  scrollableTarget="scrollable-notification"
                >
                  {notificationModels.map((notification) => (
                    <MenuItem key={notification.notificationId}>
                      <NotificationCard notification={notification} />
                    </MenuItem>
                  ))}
                </InfiniteScroll>
              </Box>
            )}
          </MenuList>
        </Menu>
        {getNotificationCount && getNotificationCount.count >= 1 && (
          <Box
            h="22px"
            w="22px"
            bg="red"
            borderRadius="full"
            position="absolute"
            top="-5px"
            right="48px"
          >
            <Text
              textAlign="center"
              color="white"
              fontSize="sm"
              fontWeight="semibold"
            >
              {getNotificationCount?.count}
            </Text>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Notifications;
