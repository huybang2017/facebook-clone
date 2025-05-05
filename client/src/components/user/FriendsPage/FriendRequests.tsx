import {
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import useFetchAllFriendRequest from "../../../hooks/user/useFetchAllFriendRequest";
import { useFriendStore } from "../../../store/friend-store";
import { useUserStore } from "../../../store/user-store";
import FriendsList from "./FriendsList";

const FriendRequests = () => {
  const { userId } = useUserStore();
  const {
    data: fetchAllRequest,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useFetchAllFriendRequest({
    userId: userId,
    pageSize: 14,
  });

  const fetchFriendRequestsData =
    fetchAllRequest?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5];
  const { setIsAllFriends, setIsSuggestions, setIsFriendsRequest } =
    useFriendStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/friends");
    setIsAllFriends(false);
    setIsSuggestions(false);
    setIsFriendsRequest(false);
  };
  return (
    <Card
      borderRadius="none"
      height={{ base: "100vh", lg: "99vh", xl: "93vh" }}
    >
      <Box
        padding={3}
        position="sticky"
        top="60px"
        mt={{ base: "50px", xl: "0" }}
        height="100%"
        overflowY="auto"
        id="scrollable-friend"
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
        <Flex alignItems="center">
          <IconButton
            icon={<IoMdArrowRoundBack size="25px" />}
            aria-label="Back"
            variant="ghost"
            size="md"
            isRound
            mr="10px"
            mb="15px"
            onClick={handleNavigateClick}
          />

          <Box>
            <Text
              _hover={{ textDecoration: "underline" }}
              fontSize="sm"
              cursor="pointer"
              onClick={handleNavigateClick}
            >
              Friends
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb="10px">
              Friend Requests
            </Text>
          </Box>
        </Flex>

        <Divider mb="15px" />
        <Text fontSize="lg" fontWeight="semibold">
          Friend Requests
        </Text>

        <InfiniteScroll
          dataLength={fetchFriendRequestsData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
          scrollableTarget="scrollable-friend"
        >
          {isLoading ? (
            <>
              {array.map((skeleton) => (
                <Skeleton height="100px" key={skeleton} mt="10px" />
              ))}
            </>
          ) : (
            <>
              {fetchAllRequest &&
                fetchAllRequest.pages.map((page) =>
                  page.userList.map((list) => (
                    <FriendsList key={list.uniqueId} friend={list} />
                  ))
                )}
            </>
          )}
        </InfiniteScroll>
      </Box>
    </Card>
  );
};

export default FriendRequests;
