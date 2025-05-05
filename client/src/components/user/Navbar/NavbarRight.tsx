import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoLogOutSharp, IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { RiNewsFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import pic from "../../../assets/profpic.jpeg";
import useFetchAllUserChats from "../../../hooks/user/useFetchAllUserChats";
import useGetCurrentUserInfo from "../../../hooks/user/useGetCurrentUserInfo";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useGameStore } from "../../../store/game-store";
import { useMessageStore } from "../../../store/message-store";
import { useNotificationStore } from "../../../store/notification-store";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
import Messenger from "../Chat/Messenger";
import Notifications from "./Notifications";

const NavbarRight = () => {
  const { onOpen } = useGameStore();
  const { data: getUserInfo } = useGetCurrentUserInfo();
  const { resetUser } = useUserStore();
  const { addNotification, stompClientRef, setIsConnected, isConnected } =
    useNotificationStore();
  const queryClient = useQueryClient();
  const { logout } = useAuthQueryStore();

  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateProfileClick = () => {
    navigate(`/profile/${getUserInfo?.userId}`);
    setIsProfile(true);
  };

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
    resetUser();
    setIsConnected(false);
  };

  const {
    data: fetchAllChat,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllUserChats({
    userId: getUserInfo?.userId ?? 0,
    pageSize: 20,
  });

  const groupChatIds =
    fetchAllChat?.pages.flatMap((page) =>
      page.chatModels
        .filter((chat) => chat.chatType === "GROUP_CHAT")
        .map((chat) => chat.chatId)
    ) || [];

  const { addMessage } = useMessageStore();

  const subscribedChatIdsRef = useRef(new Map<number, Stomp.Subscription>());

  useEffect(() => {
    if (getUserInfo && stompClientRef.current === null) {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);

      client.connect(
        {},
        () => {
          stompClientRef.current = client;
          setIsConnected(true);
          console.log(
            `Connected to WebSocket for user email: ${getUserInfo?.email}`
          );

          stompClientRef.current.subscribe(
            `/user/${getUserInfo?.email}/notifications`,
            (message) => {
              const notification = JSON.parse(message.body);
              addNotification(notification);
            }
          );

          stompClientRef.current.subscribe(
            `/user/${getUserInfo?.email}/chat`,
            (message) => {
              const text = JSON.parse(message.body);
              addMessage(text.chatId, text);
            }
          );
        },
        (error) => {
          console.error("WebSocket connection error:", error);
        }
      );
      return () => {
        if (stompClientRef.current) {
          stompClientRef.current.disconnect(() => {
            console.log("Disconnected from WebSocket");
            stompClientRef.current = null;
            setIsConnected(false);

            subscribedChatIdsRef.current.forEach((subscription) => {
              subscription.unsubscribe();
            });
            subscribedChatIdsRef.current.clear();

            console.log("All subscriptions cleared.");
          });
        }
      };
    }
  }, [getUserInfo?.email]);

  useEffect(() => {
    if (isConnected && fetchAllChat) {
      groupChatIds.forEach((chatId) => {
        if (!subscribedChatIdsRef.current.has(chatId)) {
          const subscription = stompClientRef.current?.subscribe(
            `/topic/chat/${chatId}`,
            (message) => {
              const text = JSON.parse(message.body);
              addMessage(text.chatId, text);
            }
          );
          if (subscription) {
            subscribedChatIdsRef.current.set(chatId, subscription);
          }
        }
      });
    }
  }, [fetchAllChat, isConnected, groupChatIds]);

  useEffect(() => {
    if (groupChatIds.length !== subscribedChatIdsRef.current.size)
      subscribedChatIdsRef.current.forEach((subscription, chatId) => {
        if (!groupChatIds.includes(chatId)) {
          subscription.unsubscribe();
          subscribedChatIdsRef.current.delete(chatId);
        }
      });
  }, [groupChatIds.length]);

  return (
    <Box display="flex" justifyContent="end" mr="10px" alignItems="center">
      {/* <ColorModeSwitch /> */}
      <Box mr="5px">
        <Messenger
          fetchAllChat={fetchAllChat}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
        />
      </Box>
      <Box mr="5px">
        <Notifications />
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar src={getUserInfo?.profilePicture || pic} size="sm" />}
          variant="none"
        />

        <MenuList>
          <MenuItem
            paddingBottom={3}
            paddingTop={3}
            onClick={handleNavigateProfileClick}
          >
            <Avatar
              src={getUserInfo?.profilePicture || pic}
              size="xs"
              ml="3px"
            />
            <Text ml="12px" textTransform="capitalize">
              {getUserInfo?.firstName} {getUserInfo?.lastName}
            </Text>
          </MenuItem>

          <Link to="/home">
            <MenuItem>
              <RiNewsFill size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  News Feed
                </Text>
                <Text fontSize="xs" ml="10px">
                  See relevant posts from people and Pages you follow.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/friends">
            <MenuItem>
              <FaUserFriends size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Friends
                </Text>
                <Text fontSize="xs" ml="10px">
                  Search for friends or people you may know.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/watch">
            <MenuItem>
              <MdOndemandVideo size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Videos
                </Text>
                <Text fontSize="xs" ml="10px">
                  A video destination personalized to your interests and
                  connections.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/marketplace">
            <MenuItem>
              <IoStorefrontSharp size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Marketplace
                </Text>
                <Text fontSize="xs" ml="10px">
                  Buy and sell in your community.
                </Text>
              </Box>
            </MenuItem>
          </Link>

          <MenuItem onClick={onOpen}>
            <IoLogoGameControllerA size="30px" />
            <Box flexDirection="row">
              <Text fontSize="sm" ml="10px">
                Play Games
              </Text>
              <Text fontSize="xs" ml="10px">
                Play your favorite games.
              </Text>
            </Box>
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <IoLogOutSharp size="30px" />
            <Text ml="10px">Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavbarRight;
